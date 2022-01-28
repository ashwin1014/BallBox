import {UserProfile} from 'src/types';

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
    },
    {
      id: 'p2',
      name: 'Player 2',
      number: '+919876789878',
      photo: 'https://i.pravatar.cc/300?img=25',
    },
    {
      id: 'p3',
      name: 'Player 3',
      number: '+919876789877',
      photo: 'https://i.pravatar.cc/300?img=26',
    },
    {
      id: 'p4',
      name: 'Player 4',
      number: '+919876789876',
      photo: 'https://i.pravatar.cc/300?img=66',
    },
  ],
};

export {userProfile};
