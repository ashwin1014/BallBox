import {useState} from 'react';
import {AppLayout, View} from 'src/components';
import {StyleSheet, SafeAreaView, Text as RnText} from 'react-native';

import {Text, Input, Button as IconBtn} from '@ui-kitten/components';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {ArrowForward} from 'src/assets';
import {Space, ErrorText, Button} from 'src/components';
import {useToggle} from 'src/hooks';
import {commonStyles, theme} from 'src/theme';
import {isEmpty} from 'src/utils';


type AddPlayerProps = {
  toggleAuthState: () => void;
};

const AddPlayer = ({toggleAuthState}: AddPlayerProps) => {
  const [error, setError] = useState({name: ''});
  const [name, setName] = useState('');
  const [showAddPlayer, handleAddPlayer] = useToggle(false);
  const ref = useBlurOnFulfill({value: name, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: name,
    setValue: setName,
  });

  const handleAddPlayerSubmit = () => {
    if (isEmpty(name)) {
      setError(prevState => ({
        ...prevState,
        number: 'Please enter player name',
      }));
      return;
    }
    // if (!isPhoneNumberValid(number)) {
    //   setError(prevState => ({...prevState, number: 'Invalid phone number'}));
    //   return;
    // }
    // setError(prevState => ({...prevState, number: ''}));
    handleAddPlayer();
  };

//   const handleLogin = () => {
//     if (isEmpty(otp)) {
//       setError(prevState => ({...prevState, otp: 'Please enter OTP'}));
//       return;
//     }
//     toggleAuthState();
//     // toggleGuestUserState();
//   };

  return (
    <>
    <AppLayout>
      <View style={styles.addPlayerContainer}>
        <Text category="h1">Add Player</Text>
      </View>
    </AppLayout>
  </>

  )
};

export default AddPlayer;

const styles = StyleSheet.create({
  addPlayerContainer: {
    marginTop: 50,
    padding: 12,
    position: 'relative',
    height: 200,
  },
  ws: {
    width: '100%',
    height: 60,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  root: {padding: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    borderColor: theme.colors.border,
    width: 44,
    height: 44,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 8,
    margin: 4,
    color: theme.colors.text,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  loginBtnText: {
    color: theme.palette.p8,
  },
  addPlayerBtn: {
    // flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 6,
  },
});
