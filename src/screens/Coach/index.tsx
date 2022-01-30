
import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Text, Button} from '@ui-kitten/components';

// import {useAuthentication} from 'src/context';
import {AppLayout, View} from 'src/components';
import {MAIN_STACK} from 'src/constants';
import {AddPlayerScreenProp} from 'src/navigation/navigationProps';
import {theme} from 'src/theme';

const Coach = () => {
  //   const {toggleAuthState, isAuthenticated} = useAuthentication();
  const {navigate} = useNavigation<AddPlayerScreenProp>();
  
  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          <Text category="h1">Coach Screen</Text>
        </View>
        <View style={styles.container}>
          <Button
            style={styles.addPlayerBtn}
            onPress={() => navigate(MAIN_STACK.ADDPLAYER)}>
            Add Player
          </Button>
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
  addPlayerBtn: {
    // flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 6,
  }
});
