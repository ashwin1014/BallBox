import 'src/utils/ignoreWarnings';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
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
import {theme} from 'src/theme';
import ErrorBoundary from 'src/utils/ErrorBoundary';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ApplicationProvider
          {...eva}
          theme={{...eva.light, ...theme.evaThemes}}>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </Suspense>
          </ErrorBoundary>
        </ApplicationProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
