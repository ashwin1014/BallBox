interface UserProfile {
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  academy?: string;
  photo?: string;
  coaches?: Coach[];
  players?: Player[];
  userType?: 'guest' | 'admin' | 'regular';
  isPremiumUser?: boolean;
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

interface BowlerSession {
  userId: string | undefined;
  sessionId: string;
  startTime: string;
  endTime: string;
  type: 'bowler';
  balls: Array<Ball>;
}

// type Shot = {
//   shotType: string;
//   inAir: boolean;
//   runs?: number;
// };

// type Out = {
//   isOut: boolean;
//   outType?: string;
//   caughtAt?: string;
// };

type Ball = {
  playerId?: string;
  playerName?: string;
  deliveryNumber: number;
  accuracy?: string;
  length?: string;
  runs?: number;
  wicketType?: string;
};

enum Roles {
  BOWLER = 'BOWLER',
  WICKETKEEPER = 'WICKETKEEPER',
  BATSMAN = 'BATSMAN',
}

type KeyValue = {
  key: string;
  value: string;
};

export {Roles};

export type {UserProfile, Coach, Player, Ball, KeyValue, BowlerSession};
