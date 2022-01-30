import {UserProfile, PlayerSession} from 'src/types';

const batsmenSession: PlayerSession = {
  id: 's1',
  playerName: 'Virat',
  role: 'batsmen',
  balls: [
    {
      id: 'b1',
      number: 1,
      accuracy: 'Middle',
      shot: {
        shot_type: 'Cover Drive',
        in_air: true,
        runs: 1,
      },
      out: {
        is_out: false,
        out_type: 'N/A',
        caught_at: 'N/A',
      },
    },
    {
      id: 'b2',
      number: 2,
      accuracy: 'Edge',
      shot: {
        shot_type: 'Forward Defence',
        in_air: true,
        runs: 0,
      },
      out: {
        is_out: true,
        out_type: 'Caught',
        caught_at: 'Slip',
      },
    },
    {
      id: 'b3',
      number: 3,
      accuracy: 'Middle',
      shot: {
        shot_type: 'Sweep',
        in_air: true,
        runs: 6,
      },
      out: {
        is_out: false,
        out_type: 'N/A',
        caught_at: 'N/A',
      },
    },
  ],
  start_time: '30/01/2020:11.00',
  end_time: '30/01/2020:11.15',
};

const bowlerSession: PlayerSession = {
  id: 's2',
  playerName: 'Bumrah',
  role: 'bowler',
  balls: [
    {
      id: 'b1',
      number: 1,
      accuracy: 'Wicket',
      length: 'Good Length',
      shot: {
        shot_type: 'Cover Drive',
        in_air: false,
        runs: 0,
      },
      out: {
        is_out: true,
        out_type: 'N/A',
        caught_at: 'N/A',
      },
    },
    {
      id: 'b2',
      number: 2,
      accuracy: 'Edge',
      shot: {
        shot_type: 'Forward Defence',
        in_air: false,
        runs: 0,
      },
      out: {
        is_out: true,
        out_type: 'Caught',
        caught_at: 'Slip',
      },
    },
    {
      id: 'b3',
      number: 3,
      accuracy: 'Middle',
      shot: {
        shot_type: 'Sweep',
        in_air: true,
        runs: 6,
      },
      out: {
        is_out: false,
        out_type: 'N/A',
        caught_at: 'N/A',
      },
    },
  ],
  start_time: '30/01/2020:11.00',
  end_time: '30/01/2020:11.15',
};

const userProfile: UserProfile = {
  id: 'u1',
  name: 'John Doe',
  email: 'hello@world.com',
  phone: '+919876789876',
  academy: 'Hello Academy',
  photo: 'https://i.pravatar.cc/300?img=1',
  coaches: [
    {
      id: 'c1',
      name: 'Coach 1',
      number: '+919876789871',
      photo: 'https://i.pravatar.cc/300?img=11',
      academy: 'Academy 1',
    },
    {
      id: 'c2',
      name: 'Coach 2',
      number: '+919876789872',
      photo: 'https://i.pravatar.cc/300?img=24',
      academy: 'Academy 2',
    },
  ],
  players: [
    {
      id: 'p1',
      name: 'Player 1',
      number: '+919876789879',
      photo: 'https://i.pravatar.cc/300?img=12',
      role: 'Bowler',
      style: 'RHB',
      speciality: 'Fast',
      order: 'new ball',
    },
    {
      id: 'p2',
      name: 'Player 2',
      number: '+919876789878',
      photo: 'https://i.pravatar.cc/300?img=25',
      role: 'Bowler',
      style: 'LHB',
      speciality: 'off spinner',
      order: 'N/A',
    },
    {
      id: 'p3',
      name: 'Player 3',
      number: '+919876789877',
      photo: 'https://i.pravatar.cc/300?img=26',
      role: 'Bowler',
      style: 'RHB',
      order: 'N/A',
      speciality: 'Wrist Leg Spinner',
    },
    {
      id: 'p4',
      name: 'Player 4',
      number: '+919876789876',
      photo: 'https://i.pravatar.cc/300?img=66',
      role: 'Batsman',
      style: 'RHB',
      order: '1',
      speciality: 'Opener',
    },
    {
      id: 'p5',
      name: 'Player 5',
      number: '+919876789876',
      photo: 'https://i.pravatar.cc/300?img=66',
      role: 'Batsman',
      style: 'RHB',
      order: '4',
      speciality: 'Middle Order',
    },
  ],
};

export {userProfile, batsmenSession, bowlerSession};
