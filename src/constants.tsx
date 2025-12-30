import type { Project, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', href: 'work' },
  { id: 'philosophy', href: 'philosophy' },
  { id: 'process', href: 'process' },
  { id: 'studio', href: 'studio' },
  { id: 'contact', href: 'contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '01',    
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2400',
    size: 'large',
    key: 'monolith',
  },
];
