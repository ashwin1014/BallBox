import {StyleSheet, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Text, Modal, Spinner} from '@ui-kitten/components';

import {Logo} from 'src/assets';
import {View, Space} from 'src/components';
import {MAIN_STACK} from 'src/constants';
import {useAuthentication} from 'src/context';
import {TOSScreenProp, PrivacyScreenProp} from 'src/navigation/navigationProps';
import {theme} from 'src/theme';

import OTPInput from './OTPInput';

const Authentication = () => {
  const {navigate} = useNavigation<TOSScreenProp & PrivacyScreenProp>();
  const {toggleGuestUserState, toggleAuthState, loading} = useAuthentication();

  return (
    <>
      <View style={styles.container}>
        <View jcCenter style={styles.logo}>
          <Space direction="vertical">
            <Logo height={40} width={40} />
            <Text category="h2">The Ball-Box</Text>
          </Space>
        </View>
        <OTPInput
          toggleAuthState={toggleAuthState}
          toggleGuestUserState={toggleGuestUserState}
        />
        <View style={styles.tos}>
          <Text>
            By signing in, you agree to our{' '}
            <Text style={styles.link} onPress={() => navigate(MAIN_STACK.TOS)}>
              Terms of service
            </Text>{' '}
            and{' '}
            <Text
              style={styles.link}
              onPress={() => navigate(MAIN_STACK.PRIVACY)}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.guestBtn} onPress={toggleGuestUserState}>
            <Text category="h6" appearance="hint">
              Continue as guest
            </Text>
          </Pressable>
        </View>
      </View>
      {loading && (
        <Modal visible={loading} backdropStyle={styles.backdrop}>
          <Spinner />
        </Modal>
      )}
    </>
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
