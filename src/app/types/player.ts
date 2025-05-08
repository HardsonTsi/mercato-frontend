export type PlayerType = {
  id: string,
  lastname: string,
  firstname: string,
  firtname: string,
  email: string,
  number: number,
  price: number,
  available: boolean,
  country: string,
  avatar: string,
  images: string[],
  video: string,
  birthday: any,
  position: FootballPositionType
}

export enum FootballPositionType {
  // Gardiens
  GOALKEEPER = 'Gardien de but',

  // Défenseurs
  RIGHT_BACK = 'Arrière droit',
  LEFT_BACK = 'Arrière gauche',
  CENTER_BACK = 'Défenseur central',
  SWEEPER = 'Libéro',

  // Milieux défensifs
  DEFENSIVE_MIDFIELDER = 'Milieu défensif',
  CENTRAL_MIDFIELDER = 'Milieu central',
  BOX_TO_BOX_MIDFIELDER = 'Milieu box-to-box',

  // Milieux offensifs
  ATTACKING_MIDFIELDER = 'Milieu offensif',
  RIGHT_MIDFIELDER = 'Milieu droit',
  LEFT_MIDFIELDER = 'Milieu gauche',
  WIDE_PLAYMAKER = 'Meneur excentré',
  DEEP_LYING_PLAYMAKER = 'Meneur de jeu en retrait',

  // Ailiers
  LEFT_WINGER = 'Ailier gauche',
  RIGHT_WINGER = 'Ailier droit',
  INVERTED_WINGER = 'Ailier inversé',

  // Attaquants
  STRIKER = 'Attaquant de pointe',
  CENTER_FORWARD = 'Avant-centre',
  SECOND_STRIKER = 'Deuxième attaquant',
  FALSE_NINE = 'Faux neuf',
  POACHER = 'Renard des surfaces',
  TARGET_MAN = 'Pivot',
  SHADOW_STRIKER = 'Attaquant de l\'ombre',
}
