import {StyleSheet} from 'react-native';

import {Layout, LayoutProps} from '@ui-kitten/components';

import {theme} from 'src/theme';

import Header, {HeaderProps} from './Header';

interface AppLayoutProps extends LayoutProps {
  headerProps?: HeaderProps;
}

const AppLayout = ({children, headerProps, ...rest}: AppLayoutProps) => {
  return (
    <Layout style={styles.container} {...rest}>
      <Header showBackButton={false} {...headerProps} />
      {children}
    </Layout>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
});
