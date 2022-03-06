import {StackNavigationProp} from '@react-navigation/stack';

import {MAIN_STACK, MAIN_TABS} from 'src/constants';

import {NavigationParamList, BottomTabParamsList, RootRouteProps} from '.';

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

type SessionDetailScreenProp = StackNavigationProp<
  NavigationParamList,
  MAIN_STACK.SESSION_DETAILS
>;

type SessionDetailScreenRouteProp = RootRouteProps<MAIN_STACK.SESSION_DETAILS>;

export type {
  TOSScreenProp,
  PrivacyScreenProp,
  SessionTabScreenProp,
  CoachTabScreenProp,
  AnalysisTabScreenProp,
  ProfileScreenProp,
  SessionDetailScreenProp,
  SessionDetailScreenRouteProp,
};
