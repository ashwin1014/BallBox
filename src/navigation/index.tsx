import {ComponentProps} from 'react';

import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {MAIN_STACK} from 'src/constants';
import {useAuthentication} from 'src/context';
import {Home, Authentication, TermsOfService, PrivacyPolicy} from 'src/screens';

import {navigationRef} from './utils';

type NavigationProps = Partial<ComponentProps<typeof NavigationContainer>>;

type NavigationParamList = {
  [MAIN_STACK.HOME]: undefined;
  [MAIN_STACK.AUTH]: undefined;
  [MAIN_STACK.TOS]: undefined;
  [MAIN_STACK.PRIVACY]: undefined;
};

type RootRouteProps<RouteName extends keyof NavigationParamList> = RouteProp<
  NavigationParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<NavigationParamList>();

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

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        labelStyle: {
          fontSize: 18,
        },
        activeTintColor: 'red',
      }}>
       <Tab.Screen name={MAIN_STACK.HOME} component={Home} /> 
    </Tab.Navigator>
  </NavigationContainer>
)

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={MAIN_STACK.HOME}>
    <Stack.Screen name={MAIN_STACK.HOME} component={Home} />
  </Stack.Navigator>
);

const AppNavigator = (props: NavigationProps) => {
  const {isAuthenticated, isGuestUser} = useAuthentication();
  return (
    <NavigationContainer
      ref={navigationRef}
      // onReady={(): Promise<void> => RNBootSplash.hide({fade: true})}
      {...props}>
      {isAuthenticated || isGuestUser ? <AppStack /> : <AuthStack />}       
    </NavigationContainer>
  );
};



export type {NavigationParamList, RootRouteProps};
export default AppNavigator;

AppNavigator.displayName = 'AppNavigator';
