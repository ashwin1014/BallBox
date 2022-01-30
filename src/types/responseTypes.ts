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
  role?: string;
  style?: string;
  speciality?: string;
  order?: string;
}

interface Shot {
  shot_type?: string;
  in_air?: boolean;
  runs?: number;
}

interface Out {
  is_out?: boolean;
  out_type?: string;
  caught_at?: string;
}

interface Ball {
  id?: string;
  number?: number;
  accuracy?: string;
  length?: string;
  shot?: Shot;
  out?: Out;
}

interface PlayerSession {
  id?: string;
  playerName?: string;
  role?: string;
  balls?: Ball[];
  start_time?: string;
  end_time?: string;
}

export type {UserProfile, Coach, Player, PlayerSession};
