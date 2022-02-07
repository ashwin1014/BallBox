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

type Shot = {
  shotType: string;
  inAir: boolean;
  runs?: number;
};

type Out = {
  isOut: boolean;
  outType?: string;
  caughtAt?: string;
};

type Ball = {
  id?: string;
  number: number;
  accuracy?: string;
  length?: string;
  shot: Shot;
  out: Out;
};

enum Roles {
  BOWLER = 'BOWLER',
  WICKETKEEPER = 'WICKETKEEPER',
  BATSMAN = 'BATSMAN',
}

interface PlayerSession {
  id?: string;
  playerName?: string;
  role?: string;
  balls?: Ball[];
  startTime?: string;
  endTime?: string;
}

type KeyValue = {
  key: string;
  value: string;
};

export {Roles};

export type {UserProfile, Coach, Player, Ball, PlayerSession, KeyValue};
