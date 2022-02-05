import {ReactNode} from 'react';

import {StyleSheet} from 'react-native';

import {Text, Button} from '@ui-kitten/components';
import ErrorBoundary from 'react-native-error-boundary';

import {Bug} from 'src/assets';
import {Center, AutoImage, Space} from 'src/components';
import {theme} from 'src/theme';

const CustomFallback = (props: {error: Error; resetError: () => void}) => {
  return (
    <Center style={styles.container}>
      <Space direction="vertical" size="xl">
        <AutoImage source={Bug} />
        <Text category="h6">Something went wrong :(</Text>
        <Text category="c1">{props.error.toString()}</Text>
        <Button onPress={props.resetError}>Try Again</Button>
      </Space>
    </Center>
  );
};

const MyErrorBoundary = ({children}: {children: ReactNode}) => (
  <ErrorBoundary FallbackComponent={CustomFallback}>{children}</ErrorBoundary>
);

export default MyErrorBoundary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: theme.colors.background,
  },
});
