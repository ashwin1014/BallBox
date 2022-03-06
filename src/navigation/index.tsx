import {ComponentProps} from 'react';

import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import {
  Home as HomeIcon,
  Recording as SessionIcon,
  Activity as AnalysisIcon,
  People as CoachIcon,
} from 'src/assets';
import {MAIN_STACK, MAIN_TABS} from 'src/constants';
import {useAuthentication} from 'src/context';
import {
  Home,
  Authentication,
  TermsOfService,
  PrivacyPolicy,
  Analysis,
  Coach,
  Session,
  Profile,
  SessionDetail,
} from 'src/screens';
import {BattingSession, BowlerSession} from 'src/types';

import {navigationRef} from './utils';

type NavigationProps = Partial<ComponentProps<typeof NavigationContainer>>;

type NavigationParamList = {
  [MAIN_STACK.AUTH]: undefined;
  [MAIN_STACK.TOS]: undefined;
  [MAIN_STACK.PRIVACY]: undefined;
  [MAIN_STACK.TABS]: undefined;
  [MAIN_STACK.PROFILE]: undefined;
  [MAIN_STACK.SESSION_DETAILS]: {
    session: BattingSession | BowlerSession;
    sessionType: 'batting' | 'bowling';
  };
};

type BottomTabParamsList = {
  [MAIN_TABS.HOME]: undefined;
  [MAIN_TABS.SESSION]: undefined;
  [MAIN_TABS.COACH]: undefined;
  [MAIN_TABS.ANALYSIS]: undefined;
};

type RootRouteProps<RouteName extends keyof NavigationParamList> = RouteProp<
  NavigationParamList,
  RouteName
>;

const Tabs = createBottomTabNavigator<BottomTabParamsList>();
const Stack = createNativeStackNavigator<NavigationParamList>();

const BottomTabBar = ({navigation, state}: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Session" icon={SessionIcon} />
    <BottomNavigationTab title="Coach" icon={CoachIcon} />
    <BottomNavigationTab title="Analysis" icon={AnalysisIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Tabs.Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <BottomTabBar {...props} />}>
    <Tabs.Screen name={MAIN_TABS.HOME} component={Home} />
    <Tabs.Screen name={MAIN_TABS.SESSION} component={Session} />
    <Tabs.Screen name={MAIN_TABS.COACH} component={Coach} />
    <Tabs.Screen name={MAIN_TABS.ANALYSIS} component={Analysis} />
  </Tabs.Navigator>
);

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MAIN_STACK.AUTH}>
      <Stack.Screen name={MAIN_STACK.AUTH} component={Authentication} />
      <Stack.Screen name={MAIN_STACK.TOS} component={TermsOfService} />
      <Stack.Screen name={MAIN_STACK.PRIVACY} component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={MAIN_STACK.TABS}>
    <Stack.Screen name={MAIN_STACK.TABS} component={TabNavigator} />
    <Stack.Screen name={MAIN_STACK.PROFILE} component={Profile} />
    <Stack.Screen name={MAIN_STACK.SESSION_DETAILS} component={SessionDetail} />
  </Stack.Navigator>
);

const AppNavigator = (props: NavigationProps) => {
  const {isAuthenticated, isGuestUser} = useAuthentication();
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        // onReady={(): Promise<void> => RNBootSplash.hide({fade: true})}
        {...props}>
        {isAuthenticated || isGuestUser ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast />
    </>
  );
};

export type {NavigationParamList, RootRouteProps, BottomTabParamsList};
export default AppNavigator;

AppNavigator.displayName = 'AppNavigator';
