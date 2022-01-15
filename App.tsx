import 'src/utils/ignoreWarnings';
import {Suspense} from 'react';

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Spinner,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {AuthProvider} from 'src/context';
import AppNavigator from 'src/navigation';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Suspense fallback={<Spinner />}>
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
          </Suspense>
        </ApplicationProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
