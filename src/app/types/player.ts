import { Club } from '@/app/types/club.ts';

export type PlayerType = {
  id: string | undefined,
  lastname: string,
  firstname: string,
  email: string,
  number: number,
  price: number,
  available: boolean,
  country: string,
  avatar: string,
  images?: string[],
  videos?: string,
  birthday: any,
  position: string
  club?: Club
}

export const FootballPositionType: string[] = [
  // Gardiens
  'Gardien de but',

  // Défenseurs
  'Arrière droit',
  'Arrière gauche',
  'Défenseur central',
  'Libéro',

  // Milieux défensifs
  'Milieu défensif',
  'Milieu central',
  'Milieu box-to-box',

  // Milieux offensifs
  'Milieu offensif',
  'Milieu droit',
  'Milieu gauche',
  'Meneur excentré',
  'Meneur de jeu en retrait',

  // Ailiers
  'Ailier gauche',
  'Ailier droit',
  'Ailier inversé',

  // Attaquants
  'Attaquant de pointe',
  'Avant-centre',
  'Deuxième attaquant',
  'Faux neuf',
  'Renard des surfaces',
  'Pivot',
  'Attaquant de l\'ombre',
];
