import {StyleSheet, Text, View, ViewStyle, StyleProp} from 'react-native';

import {AlertTriangle} from 'src/assets';
import {theme} from 'src/theme';

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 20,
  },
  imgError: {
    marginRight: 8,
    alignSelf: 'center',
    color: theme.colors.error,
  },
  txtError: {fontSize: 14, color: theme.colors.error},
});

interface ErrorViewProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const ErrorText = ({text, style}: ErrorViewProps) => {
  return (
    <View style={[styles.errorContainer, style]}>
      <AlertTriangle style={styles.imgError} />
      <Text style={styles.txtError}>{text}</Text>
    </View>
  );
};
export default ErrorText;
