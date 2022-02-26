import {useState, useEffect} from 'react';

import {StyleSheet, SafeAreaView, Text as RnText, Keyboard} from 'react-native';

import {Text, Input, Button as IconBtn} from '@ui-kitten/components';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {ArrowForward, Edit} from 'src/assets';
import {View, Space, ErrorText, Button} from 'src/components';
import {OTP_CELL_COUNT} from 'src/constants';
import {useAuthentication} from 'src/context';
import {commonStyles, theme} from 'src/theme';
import {isPhoneNumberValid, isEmpty} from 'src/utils';

// type OTPInputProps = {
//   toggleAuthState: () => void;
//   toggleGuestUserState: () => void;
// };

const OTPInput = () => {
  const [error, setError] = useState({number: '', otp: ''});
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, handleOtpInput] = useState(false);
  const ref = useBlurOnFulfill({value: otp, cellCount: OTP_CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });
  const {phoneLogin, confirmOtpLogin, confirmSms} = useAuthentication();
  // console.log({confirmSms});

  const handleNumberSubmit = async () => {
    if (isEmpty(number)) {
      setError(prevState => ({
        ...prevState,
        number: 'Please enter your phone number',
      }));
      return;
    }
    if (!isPhoneNumberValid(number)) {
      setError(prevState => ({...prevState, number: 'Invalid phone number'}));
      return;
    }
    Keyboard.dismiss();
    setError(prevState => ({...prevState, number: ''}));
    await phoneLogin(number);
  };

  const handleLogin = () => {
    if (isEmpty(otp)) {
      setError(prevState => ({...prevState, otp: 'Please enter OTP'}));
      return;
    }
    Keyboard.dismiss();
    confirmOtpLogin(otp);
  };

  useEffect(() => {
    if (!isEmpty(confirmSms)) {
      handleOtpInput(true);
    }
  }, [confirmSms]);

  return (
    <View fullWidth style={styles.otpContainer}>
      {!showOTPInput ? (
        <>
          <Space direction="vertical">
            <Space direction="vertical" size="xxs" wrapperStyle={styles.ws}>
              <Input
                placeholder="Phone number"
                value={number}
                onChangeText={nextValue => setNumber(nextValue)}
                keyboardType="phone-pad"
                style={commonStyles.flex1}
                accessoryLeft={() => <Text>+91</Text>}
              />
              {error.number && <ErrorText text={error.number} />}
            </Space>
            <IconBtn
              onPress={handleNumberSubmit}
              style={styles.btn}
              accessoryLeft={<ArrowForward />}
            />
          </Space>
        </>
      ) : (
        <>
          <SafeAreaView style={styles.root}>
            <Space size="xxs">
              <Text>Enter OTP sent to +91{number}</Text>
              <IconBtn
                onPress={() => handleOtpInput(false)}
                appearance="ghost"
                accessoryLeft={<Edit />}
              />
            </Space>
            <CodeField
              ref={ref}
              {...props}
              value={otp}
              onChangeText={setOtp}
              cellCount={OTP_CELL_COUNT}
              caretHidden={false}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <RnText
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </RnText>
              )}
            />
            {error.otp ? (
              <ErrorText text={error.otp} style={commonStyles.mhAuto} />
            ) : null}
            <Button
              titleProps={{
                style: styles.loginBtnText,
              }}
              onPress={handleLogin}
              title="Login"
              style={styles.loginBtn}
            />
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  otpContainer: {
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
  edit: {
    backgroundColor: 'transparent',
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
  loginBtn: {
    // flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 6,
  },
});
