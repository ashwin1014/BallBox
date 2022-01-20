// import {}

import {
  Pressable,
  PressableProps,
  //   StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {Text, TextProps} from '@ui-kitten/components';

import {theme} from 'src/theme';

interface ButtonProps extends PressableProps {
  loading?: boolean;
  title?: string;
  titleProps?: TextProps;
}

const Button = ({
  loading,
  title,
  children,
  titleProps,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.palette.p8} />
      ) : (
        children || <Text {...titleProps}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;

// const styles = StyleSheet.create({});
