// src/types.ts
export type Locale = 'en' | 'es';

export type Translations<T extends string = string> = {
  [key in Locale]: Record<T, string>;
};

export interface NavItem {
  id: string;
  href: string;
}

export interface Project {
  id: string;
  year: string;
  imageUrl: string;
  size: 'large' | 'medium' | 'small';
}

export enum VizState  {
  SCHEMATIC= 'SCHEMATIC',
  VOLUMETRIC= 'VOLUMETRIC'
}


export interface HouseBlock {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  slanted?: boolean;
}

