import {ComponentProps} from 'react';

import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MAIN_STACK} from 'src/constants';
import {Home} from 'src/screens';

import {navigationRef} from './utils';

type NavigationProps = Partial<ComponentProps<typeof NavigationContainer>>;

type NavigationParamList = {
  [MAIN_STACK.HOME]: undefined;
};

type RootRouteProps<RouteName extends keyof NavigationParamList> = RouteProp<
  NavigationParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<NavigationParamList>();

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
  return (
    <NavigationContainer
      ref={navigationRef}
      // onReady={(): Promise<void> => RNBootSplash.hide({fade: true})}
      {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

export type {NavigationParamList, RootRouteProps};
export default AppNavigator;

AppNavigator.displayName = 'AppNavigator';
