import {StyleSheet} from 'react-native';

import {Layout, LayoutProps} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import {theme} from 'src/theme';

import Header, {HeaderProps} from './Header';

interface AppLayoutProps extends LayoutProps {
  headerProps?: HeaderProps;
}

const AppLayout = ({children, headerProps, ...rest}: AppLayoutProps) => {
  return (
    <SafeAreaView>
      <Layout style={styles.container} {...rest}>
        <Header showBackButton={false} {...headerProps} />
        {children}
      </Layout>
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.deviceHeight,
    backgroundColor: theme.colors.background,
  },
});
