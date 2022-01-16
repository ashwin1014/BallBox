import {StackNavigationProp} from '@react-navigation/stack';

import {MAIN_STACK} from 'src/constants';

import {NavigationParamList} from '.';

type TOSScreenProp = StackNavigationProp<NavigationParamList, MAIN_STACK.TOS>;
type PrivacyScreenProp = StackNavigationProp<
  NavigationParamList,
  MAIN_STACK.PRIVACY
>;

export type {TOSScreenProp, PrivacyScreenProp};
