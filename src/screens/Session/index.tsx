import {StyleSheet} from 'react-native';

import {Text} from '@ui-kitten/components';

// import {useAuthentication} from 'src/context';
import {AppLayout, View} from 'src/components';
// import {theme} from 'src/theme';

const Session = () => {
  //   const {toggleAuthState, isAuthenticated} = useAuthentication();
  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          <Text category="h1">Session Screen</Text>
        </View>
      </AppLayout>
    </>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
