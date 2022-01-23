import {StyleSheet} from 'react-native';

import {Text} from '@ui-kitten/components';

// import {useAuthentication} from 'src/context';
import {AppLayout, View} from 'src/components';
// import {theme} from 'src/theme';

const Coach = () => {
  //   const {toggleAuthState, isAuthenticated} = useAuthentication();
  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          <Text category="h1">Coach Screen</Text>
        </View>
      </AppLayout>
    </>
  );
};

export default Coach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
