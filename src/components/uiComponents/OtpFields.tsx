import React from 'react';

import {StyleSheet, Text} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {ErrorText} from 'src/components';
import {OTP_CELL_COUNT} from 'src/constants';
import {commonStyles, theme} from 'src/theme';

interface OTPInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  error?: string;
}

const OtpFields = ({otp, setOtp, error}: OTPInputProps) => {
  const ref = useBlurOnFulfill({value: otp, cellCount: OTP_CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  return (
    <>
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
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {error ? <ErrorText text={error} style={commonStyles.mhAuto} /> : null}
    </>
  );
};

export default OtpFields;

const styles = StyleSheet.create({
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
});
