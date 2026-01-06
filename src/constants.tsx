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
    imageUrl: '/images/Image4.jpeg',
    size: 'large',
    key: 'kitchen',
  },
  {
    id: '02',
    year: '2023',
    imageUrl: '/images/Image7.jpeg',
    size: 'large',
    key: 'country_house',
  },
  {
    id: '03',
    year: '2022',
    imageUrl: '/images/Image6.jpeg',
    size: 'medium',
    key: 'kids_room',
  },
  {
    id: '04',
    year: '2022',
    imageUrl: '/images/Image5.jpeg',
    size: 'medium',
    key: 'bath',
  },
  {
    id: '05',
    year: '2022',
    imageUrl: '/images/Image8.jpeg',
    size: 'large',
    key: 'living_dining',
  },
  {
    id: '06',
    year: '2021',
    imageUrl: '/images/Image9.jpeg',
    size: 'medium',
    key: 'master_suite',
  },
  {
    id: '07',
    year: '2021',
    imageUrl: '/images/Image10.jpeg',
    size: 'medium',
    key: 'patio',
  },
  {
    id: '08',
    year: '2020',
    imageUrl: '/images/Image11.jpeg',
    size: 'large',
    key: 'clinic',
  },
];
