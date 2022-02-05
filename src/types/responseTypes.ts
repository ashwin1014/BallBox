interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  academy?: string;
  photo?: string;
  coaches?: Coach[];
  players?: Player[];
}

interface Coach {
  id?: string;
  name?: string;
  number?: string;
  photo?: string;
  academy?: string;
}

interface Player {
  id?: string;
  name?: string;
  number?: string;
  photo?: string;
  role: Array<Roles>;
  style?: string;
  specialty?: string;
  order?: string;
}

interface Shot {
  shotType: string;
  inAir: boolean;
  runs?: number;
}

interface Out {
  isOut: boolean;
  outType?: string;
  caughtAt?: string;
}

interface Ball {
  id?: string;
  number: number;
  accuracy?: string;
  length?: string;
  shot: Shot;
  out: Out;
}

enum Roles {
  BOWLER = 'BOWLER',
  WICKETKEEPER = 'WICKETKEEPER',
  BATSMAN = 'BATSMAN',
}

export {Roles};

export type {UserProfile, Coach, Player, Ball};
