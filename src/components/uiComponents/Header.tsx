// import {ReactText} from 'react';

import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  TopNavigation,
  TopNavigationAction,
  Text,
  TextProps,
} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';

import {BackIcon, Logo, MoreVertical} from 'src/assets';
import {Space} from 'src/components';
import {theme} from 'src/theme';

interface HeaderProps {
  showBackButton?: boolean;
  title?: RenderProp<TextProps>;
}

const Header = ({showBackButton, title}: HeaderProps) => {
  const {goBack} = useNavigation();
  return (
    <TopNavigation
      style={styles.container}
      accessoryLeft={
        showBackButton ? (
          <TopNavigationAction icon={BackIcon} onPress={goBack} />
        ) : undefined
      }
      accessoryRight={<TopNavigationAction icon={MoreVertical} />}
      alignment="center"
      title={
        title || (
          <Space>
            <Logo height={20} width={20} />
            <Text category="label">The Ball-Box</Text>
          </Space>
        )
      }
    />
  );
};

export default Header;
export type {HeaderProps};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.p2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
