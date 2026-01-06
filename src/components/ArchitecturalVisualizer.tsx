import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VizStateValues } from '../types';
import type { VizState } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

// Simplified OrbitControls implementation
class SimpleOrbitControls {
  camera: THREE.PerspectiveCamera;
  domElement: HTMLElement;
  enabled = true;
  dampingFactor = 0.05;
  
  private spherical = { radius: 15, theta: Math.PI / 4, phi: Math.PI / 3 };
  private target = new THREE.Vector3(0, 2, 0);
  private isDragging = false;
  private previousMouse = { x: 0, y: 0 };
  private velocity = { theta: 0, phi: 0 };

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.setupEventListeners();
    this.update();
  }

  private setupEventListeners() {
    this.domElement.addEventListener('mousedown', this.onMouseDown);
    this.domElement.addEventListener('wheel', this.onWheel, { passive: false });
  }

  private onMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.previousMouse = { x: e.clientX, y: e.clientY };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      
      const deltaX = e.clientX - this.previousMouse.x;
      const deltaY = e.clientY - this.previousMouse.y;
      
      this.velocity.theta = -deltaX * 0.01;
      this.velocity.phi = -deltaY * 0.01;
      
      this.previousMouse = { x: e.clientX, y: e.clientY };
    };
    
    const onMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.spherical.radius += e.deltaY * 0.01;
    this.spherical.radius = Math.max(8, Math.min(25, this.spherical.radius));
  };

  update() {
    this.spherical.theta += this.velocity.theta;
    this.spherical.phi += this.velocity.phi;
    this.velocity.theta *= (1 - this.dampingFactor);
    this.velocity.phi *= (1 - this.dampingFactor);
    
    this.spherical.phi = Math.max(0.1, Math.min(Math.PI / 2.1, this.spherical.phi));
    
    const x = this.spherical.radius * Math.sin(this.spherical.phi) * Math.cos(this.spherical.theta);
    const y = this.spherical.radius * Math.cos(this.spherical.phi);
    const z = this.spherical.radius * Math.sin(this.spherical.phi) * Math.sin(this.spherical.theta);
    
    this.camera.position.set(
      this.target.x + x,
      this.target.y + y,
      this.target.z + z
    );
    this.camera.lookAt(this.target);
  }

  dispose() {
    this.domElement.removeEventListener('mousedown', this.onMouseDown);
    this.domElement.removeEventListener('wheel', this.onWheel);
  }
}

// Main Component
export const ArchitecturalVisualizer: React.FC = () => {
  const [mode, setMode] = useState<VizState>(VizStateValues.SCHEMATIC);
  const { locale } = useLanguage();
  const t = translations[locale];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneDataRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: SimpleOrbitControls;
    solids: THREE.Group;
    wires: THREE.Group;
    grid: THREE.GridHelper;
    progress: number;
    targetMode: VizState;
    frameId: number;
  } | null>(null);

  // Three.js initialization
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Critical: Check if already initialized AND still has canvas
    const existingCanvas = containerRef.current.querySelector('canvas');
    if (sceneDataRef.current && existingCanvas) {
      console.log('⚠️ Scene already exists with canvas, skipping init');
      return;
    }
    
    // Clean up any orphaned canvas
    if (existingCanvas && !sceneDataRef.current) {
      console.log('🧹 Removing orphaned canvas');
      existingCanvas.remove();
    }
    
    console.log('🎬 Initializing 3D Scene');

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);
    scene.fog = new THREE.Fog(0xf8f8f8, 20, 40);

    const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(10, 8, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Append canvas
    try {
      containerRef.current.appendChild(renderer.domElement);
      console.log('✅ Canvas appended to DOM');
    } catch (err) {
      console.error('❌ Failed to append canvas:', err);
      return;
    }

    const controls = new SimpleOrbitControls(camera, renderer.domElement);

    // Grid
    const grid = new THREE.GridHelper(20, 40, 0x666666, 0xcccccc);
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity = 0.15;
    scene.add(grid);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.2 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.position.y = -0.01;
    scene.add(ground);

    // House Groups
    const solidsGroup = new THREE.Group();
    const wireframesGroup = new THREE.Group();
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);
    houseGroup.add(solidsGroup);
    houseGroup.add(wireframesGroup);

    const createPart = (
      geo: THREE.BufferGeometry, 
      pos: [number, number, number], 
      color = 0xffffff,
      metalness = 0.1,
      roughness = 0.8
    ) => {
      // Solid mesh
      const mat = new THREE.MeshStandardMaterial({ 
        color, 
        transparent: true, 
        opacity: 0,
        roughness,
        metalness
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      solidsGroup.add(mesh);

      // Wireframe
      const edges = new THREE.EdgesGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ 
        color: 0x222222, 
        transparent: true, 
        opacity: 1
      });
      const wire = new THREE.LineSegments(edges, wireMat);
      wire.position.set(...pos);
      wireframesGroup.add(wire);
    };

    // Build house
    createPart(new THREE.BoxGeometry(5, 2.5, 4), [0, 1.25, 0], 0xf5f5f5, 0.05, 0.9);
    createPart(new THREE.BoxGeometry(4, 2, 3), [0.5, 3.75, 0], 0xfafafa, 0.05, 0.85);
    createPart(new THREE.BoxGeometry(5.5, 0.25, 4.5), [0, 5, 0], 0x2a2a2a, 0.3, 0.7);
    createPart(new THREE.BoxGeometry(2.5, 0.15, 2), [2.25, 2.5, 1], 0x3a3a3a, 0.4, 0.6);
    createPart(new THREE.BoxGeometry(0.8, 1.2, 0.1), [-1.5, 1.5, 2.05], 0x1a1a1a, 0.6, 0.4);
    createPart(new THREE.BoxGeometry(0.8, 1.2, 0.1), [0, 1.5, 2.05], 0x1a1a1a, 0.6, 0.4);
    createPart(new THREE.BoxGeometry(0.8, 1.2, 0.1), [1.5, 1.5, 2.05], 0x1a1a1a, 0.6, 0.4);
    createPart(new THREE.BoxGeometry(0.8, 1.2, 0.1), [-1, 4, 1.55], 0x1a1a1a, 0.6, 0.4);
    createPart(new THREE.BoxGeometry(0.8, 1.2, 0.1), [1, 4, 1.55], 0x1a1a1a, 0.6, 0.4);
    createPart(new THREE.BoxGeometry(1, 2, 0.1), [2.5, 1, 1.05], 0x4a4a4a, 0.5, 0.5);
    createPart(new THREE.BoxGeometry(2.2, 2, 0.1), [-1.4, 1, 2.05], 0x5a5a5a, 0.4, 0.6);
    createPart(new THREE.BoxGeometry(8, 0.1, 6), [0, 0.05, 0.5], 0xd4c8b0, 0, 1);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff5e6, 1.8);
    sun.position.set(8, 12, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    scene.add(sun);

    const rimLight = new THREE.DirectionalLight(0x88ccff, 0.5);
    rimLight.position.set(-8, 5, -6);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(fillLight);

    // Store scene data BEFORE starting animation
    const sceneData = {
      scene,
      camera,
      renderer,
      controls,
      solids: solidsGroup,
      wires: wireframesGroup,
      grid: grid,
      progress: 0,
      targetMode: VizStateValues.SCHEMATIC,
      frameId: 0
    };
    
    sceneDataRef.current = sceneData;

    // Animation Loop
    const animate = () => {
      sceneData.frameId = requestAnimationFrame(animate);
      
      const target = sceneData.targetMode === VizStateValues.VOLUMETRIC ? 1 : 0;
      sceneData.progress += (target - sceneData.progress) * 0.08;
      const p = sceneData.progress;

      // Update solids
      sceneData.solids.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = p;
        mesh.scale.y = 0.3 + (p * 0.7);
      });

      // Update wireframes
      sceneData.wires.children.forEach((child) => {
        const wire = child as THREE.LineSegments;
        (wire.material as THREE.LineBasicMaterial).opacity = 1 - (p * 0.7);
      });

      // Update grid
      (sceneData.grid.material as THREE.LineBasicMaterial).opacity = 0.15 + (0.15 * (1 - p));

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    console.log('🎥 Animation loop started');

    const handleResize = () => {
      if (!containerRef.current || !sceneDataRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      sceneDataRef.current.camera.aspect = w / h;
      sceneDataRef.current.camera.updateProjectionMatrix();
      sceneDataRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('🧹 Cleaning up 3D scene');
      window.removeEventListener('resize', handleResize);
      
      if (sceneDataRef.current) {
        cancelAnimationFrame(sceneDataRef.current.frameId);
        sceneDataRef.current.renderer.dispose();
        sceneDataRef.current.controls.dispose();
        
        // Only remove canvas if container still exists
        if (containerRef.current) {
          const canvas = containerRef.current.querySelector('canvas');
          if (canvas) {
            canvas.remove();
            console.log('✅ Canvas removed from DOM');
          }
        }
        
        sceneDataRef.current = null;
      }
    };
  }, []); // Empty deps

  // Update mode when state changes
  useEffect(() => {
    if (sceneDataRef.current) {
      sceneDataRef.current.targetMode = mode;
    }
  }, [mode]);

  return (
    <section id="process" className="py-24 md:py-48 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-gray-400 block mb-4">
                {t.concept.label}
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-gray-900">
                {t.concept.title_prefix}<br />
                <span className="italic text-gray-500">{t.concept.title_highlight}</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              {t.concept.description}
            </p>

            <div className="pt-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  {t.concept.renderMode}
                </span>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => {
                      const newMode = mode === VizStateValues.SCHEMATIC ? VizStateValues.VOLUMETRIC : VizStateValues.SCHEMATIC;
                      setMode(newMode);
                    }}
                    className="relative w-20 h-10 bg-gray-200 rounded-full p-1 transition-all duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    <div className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-lg transition-transform duration-500 flex items-center justify-center ${
                      mode === VizStateValues.VOLUMETRIC ? 'translate-x-10' : 'translate-x-0'
                    }`}>
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                        mode === VizStateValues.VOLUMETRIC ? 'bg-gray-900' : 'bg-gray-300'
                      }`} />
                    </div>
                  </button>
                  <div className="flex flex-col">
                    <span className="text-sm font-mono uppercase tracking-widest font-medium text-gray-800">
                      {mode === VizStateValues.SCHEMATIC ? t.concept.modes.schematic : t.concept.modes.volumetric}
                    </span>
                    
                  </div>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm max-w-xs shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-gray-500">
                  {t.concept.nav.title}
                </h4>
                <ul className="text-[10px] font-mono text-gray-600 space-y-1.5">
                  <li>• {t.concept.nav.rotate} : {t.concept.nav.rotate_desc}</li>
                  <li>• {t.concept.nav.zoom} : {t.concept.nav.zoom_desc}</li>
                  <li>• {t.concept.nav.pan} : {t.concept.nav.pan_desc}</li>
                </ul>
              </div>
            </div>

            
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative aspect-square bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
              
              <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              <div className="absolute top-6 left-6 flex flex-col space-y-2 pointer-events-none">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                  <span className="text-[10px] font-mono tracking-wider text-gray-600">
                    STREAMING
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-[10px] font-mono tracking-wider text-gray-400">
                    ORBIT FREE
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 text-right pointer-events-none">
                <div className="text-[9px] font-mono text-gray-400 uppercase leading-loose">
                  {t.concept.specs.fov}: 45.00°<br />
                  {t.concept.specs.aa}: 16X MSAA<br />
                  {t.concept.specs.renderer}: PBR
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                  {t.concept.canvas_hint}
                </span>
              </div>
            </div>

            
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArchitecturalVisualizer;