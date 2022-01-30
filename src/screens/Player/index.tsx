import {StyleSheet, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';

import {Logo} from 'src/assets';
import {View, Space} from 'src/components';
import {MAIN_STACK} from 'src/constants';
import {useAuthentication} from 'src/context';
import {theme} from 'src/theme';

import AddPlayer from './addPlayer';

const Authentication = () => {
  const {toggleGuestUserState, toggleAuthState} = useAuthentication();

  return (
    <View style={styles.container}>
      <View jcCenter style={styles.logo}>
        <Space direction="vertical">
          <Logo height={40} width={40} />
          <Text category="h2">The Ball-Box</Text>
        </Space>
      </View>
      <AddPlayer
        toggleAuthState={toggleAuthState}
      />
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  logo: {
    marginTop: '20%',
  },
  tos: {
    marginTop: 'auto',
    marginBottom: 50,
    padding: 12,
  },
  footer: {
    padding: 4,
    justifyContent: 'center',
    backgroundColor: '#f3f0ee',
  },
  guestBtn: {
    alignSelf: 'center',
    padding: 4,
  },
  link: {
    color: theme.colors.link,
    textDecorationLine: 'underline',
  },
});
