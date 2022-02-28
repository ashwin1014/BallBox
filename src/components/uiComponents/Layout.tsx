import {StyleSheet} from 'react-native';

import {Layout, LayoutProps} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import {theme} from 'src/theme';

import Header, {HeaderProps} from './Header';

interface AppLayoutProps extends LayoutProps {
  headerProps?: HeaderProps;
  showHeader?: boolean;
}

const AppLayout = ({
  children,
  headerProps,
  showHeader,
  ...rest
}: AppLayoutProps) => {
  return (
    <SafeAreaView>
      <Layout style={styles.container} {...rest}>
        {showHeader ? <Header showBackButton={false} {...headerProps} /> : null}
        {children}
      </Layout>
    </SafeAreaView>
  );
};

export default AppLayout;

AppLayout.defaultProps = {
  showHeader: true,
};

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.deviceHeight,
    backgroundColor: theme.colors.background,
  },
});
