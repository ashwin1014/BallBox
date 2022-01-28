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
}

export type {UserProfile, Coach, Player};
