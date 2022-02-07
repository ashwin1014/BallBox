import {UserProfile, Roles, KeyValue} from 'src/types';

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
      role: ['BATSMAN'] as Roles[],
      style: 'left-handed batsman',
      order: '1',
      specialty: 'Opener',
    },
    {
      id: 'p2',
      name: 'Player 2',
      number: '+919876789878',
      photo: 'https://i.pravatar.cc/300?img=25',
      role: ['BATSMAN', 'BOWLER'] as Roles[],
      style: 'Wrist Leg Spinner',
      order: '6',
      specialty: 'all-rounder',
    },
    {
      id: 'p3',
      name: 'Player 3',
      number: '+919876789877',
      photo: 'https://i.pravatar.cc/300?img=26',
      role: ['BOWLER'] as Roles[],
      style: 'right-handed bowler',
      order: 'N/A',
      specialty: 'Fast',
    },
    {
      id: 'p4',
      name: 'Player 4',
      number: '+919876789876',
      photo: 'https://i.pravatar.cc/300?img=66',
      role: ['BATSMAN', 'WICKETKEEPER'] as Roles[],
      order: '4',
      specialty: 'mid-order batsman, wicketkeeper',
    },
  ],
};

const bowlerLengths: Array<KeyValue> = [
  {
    key: 'yorker',
    value: 'Yorker',
  },
  {
    key: 'half_volley',
    value: 'Half Volley',
  },
  {
    key: 'full_length',
    value: 'Full Length',
  },
  {
    key: 'good_length',
    value: 'Good Length',
  },
  {
    key: 'back_of_length',
    value: 'Back of Length',
  },
  {
    key: 'short',
    value: 'Short',
  },
  {
    key: 'bouncer',
    value: 'Bouncer',
  },
];

const bowlerAccuracies: Array<KeyValue> = [
  {
    key: 'wicket',
    value: 'Wicket',
  },
  {
    key: 'dot',
    value: 'Dot',
  },
  {
    key: 'wide',
    value: 'Wide',
  },
  {
    key: 'no_ball',
    value: 'No Ball',
  },
  {
    key: 'leg_bye',
    value: 'Leg Bye',
  },
  {
    key: 'bye',
    value: 'Bye',
  },
  {
    key: 'run',
    value: 'Run(s)',
  },
];

const runs = [1, 2, 3, 4, 5, 6];
const wicket = [
  {
    key: 'caught',
    value: 'Caught',
  },
  {
    key: 'run_out',
    value: 'Run Out',
  },
  {
    key: 'stumped',
    value: 'Stumped',
  },
  {
    key: 'bowled',
    value: 'Bowled',
  },
];

export {userProfile, bowlerLengths, bowlerAccuracies, runs, wicket};
