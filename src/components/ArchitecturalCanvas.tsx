import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VizState } from '../types';

interface ArchitecturalCanvasProps {
  mode: VizState;
}


export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({ mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  // Storage for transitionable elements
  const solidsRef = useRef<THREE.Group>(new THREE.Group());
  const wireframesRef = useRef<THREE.Group>(new THREE.Group());
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const progressRef = useRef(0);
  
  
  const modeRef = useRef(mode);

  
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfc);
    sceneRef.current = scene;

    const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(8, 6, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controlsRef.current = controls;

    // 3. Grid & Environment
    const grid = new THREE.GridHelper(10, 20, 0x000000, 0xdddddd);
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity = 0.2;
    scene.add(grid);
    gridRef.current = grid;

    // 4. House Construction
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);
    houseGroup.add(solidsRef.current);
    houseGroup.add(wireframesRef.current);

    const createPart = (geo: THREE.BufferGeometry, pos: [number, number, number], color = 0xffffff) => {
      // Solid
      const mat = new THREE.MeshStandardMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0,
        roughness: 0.8,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      solidsRef.current.add(mesh);

      // Wireframe
      const edges = new THREE.EdgesGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ 
        color: 0x000000, 
        transparent: true, 
        opacity: 0.8 
      });
      const wire = new THREE.LineSegments(edges, wireMat);
      wire.position.set(...pos);
      wireframesRef.current.add(wire);
    };

    // Main Body
    createPart(new THREE.BoxGeometry(4, 2, 3), [0, 1, 0]);
    
    // Roof (Gabled Prism)
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-2.1, 0);
    roofShape.lineTo(0, 1.5);
    roofShape.lineTo(2.1, 0);
    roofShape.lineTo(-2.1, 0);

    const roofExtrudeSettings = { depth: 3.2, bevelEnabled: false };
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, roofExtrudeSettings);
    roofGeo.rotateY(Math.PI / 2);
    createPart(roofGeo, [0, 2, 1.6], 0x333333);

    // Porch Slab
    createPart(new THREE.BoxGeometry(2, 0.2, 2), [2, 0.1, 1], 0xd2c4b0);

    // Chimney
    createPart(new THREE.BoxGeometry(0.5, 3, 0.5), [-1, 1.5, -0.8], 0xffffff);

    // 5. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 10, 7.5);
    sun.castShadow = true;
    sun.shadow.camera.left = -5;
    sun.shadow.camera.right = 5;
    sun.shadow.camera.top = 5;
    sun.shadow.camera.bottom = -5;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // 6. Animation
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      
      const target = modeRef.current === VizState.VOLUMETRIC ? 1 : 0;
      progressRef.current = THREE.MathUtils.lerp(progressRef.current, target, 0.1);

      // Material updates
      solidsRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = progressRef.current;
        mat.needsUpdate = true;
        mesh.scale.y = 0.5 + (progressRef.current * 0.5);
      });

      wireframesRef.current.children.forEach((child) => {
        const wire = child as THREE.LineSegments;
        const wireMat = wire.material as THREE.LineBasicMaterial;
        wireMat.opacity = 0.8 - (progressRef.current * 0.6);
        wireMat.needsUpdate = true;
      });

      if (gridRef.current) {
        const gridMat = gridRef.current.material as THREE.LineBasicMaterial;
        gridMat.opacity = 0.1 + (0.3 * (1 - progressRef.current));
        gridMat.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      controls.dispose();
      if (containerRef.current && renderer.domElement.parentElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-move" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-[9px] uppercase tracking-widest opacity-30 font-mono bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
        Drag to Orbit • Scroll to Zoom
      </div>
    </div>
  );
};