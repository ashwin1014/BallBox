import {StackNavigationProp} from '@react-navigation/stack';

import {MAIN_STACK, MAIN_TABS} from 'src/constants';

import {NavigationParamList, BottomTabParamsList} from '.';

type TOSScreenProp = StackNavigationProp<NavigationParamList, MAIN_STACK.TOS>;
type ProfileScreenProp = StackNavigationProp<
  NavigationParamList,
  MAIN_STACK.PROFILE
>;
type PrivacyScreenProp = StackNavigationProp<
  NavigationParamList,
  MAIN_STACK.PRIVACY
>;
type SessionTabScreenProp = StackNavigationProp<
  BottomTabParamsList,
  MAIN_TABS.SESSION
>;

type CoachTabScreenProp = StackNavigationProp<
  BottomTabParamsList,
  MAIN_TABS.COACH
>;

type AnalysisTabScreenProp = StackNavigationProp<
  BottomTabParamsList,
  MAIN_TABS.ANALYSIS
>;

export type {
  TOSScreenProp,
  PrivacyScreenProp,
  SessionTabScreenProp,
  CoachTabScreenProp,
  AnalysisTabScreenProp,
  ProfileScreenProp,
};
