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
  key: string;
}


export const VizStateValues = {
  SCHEMATIC: 'SCHEMATIC',
  VOLUMETRIC: 'VOLUMETRIC',
} as const;


export type VizState = typeof VizStateValues[keyof typeof VizStateValues];


export interface HouseBlock {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  slanted?: boolean;
}

