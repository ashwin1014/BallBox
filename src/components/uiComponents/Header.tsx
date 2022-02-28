// import {ReactText} from 'react';

import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  TopNavigation,
  TopNavigationAction,
  Text,
  TextProps,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';

import {BackIcon, Logo, MoreVertical, Logout, Person} from 'src/assets';
import {Space} from 'src/components';
import {MAIN_STACK} from 'src/constants';
import {useAuthentication} from 'src/context';
import {useToggle} from 'src/hooks';
import {ProfileScreenProp} from 'src/navigation/navigationProps';
import {theme} from 'src/theme';

interface HeaderProps {
  showBackButton?: boolean;
  title?: RenderProp<TextProps>;
}

const Header = ({showBackButton, title}: HeaderProps) => {
  const {goBack, navigate} = useNavigation<ProfileScreenProp>();
  const [menu, toggleMenu] = useToggle(false);
  const {handleSignOut} = useAuthentication();

  const navigateToProfile = () => {
    toggleMenu();
    navigate(MAIN_STACK.PROFILE);
  };

  const onSignOut = () => {
    toggleMenu();
    handleSignOut();
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MoreVertical} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menu}
        onBackdropPress={toggleMenu}>
        <MenuItem
          accessoryLeft={Person}
          title="Profile"
          onPress={navigateToProfile}
        />
        <MenuItem accessoryLeft={Logout} title="Logout" onPress={onSignOut} />
      </OverflowMenu>
    </>
  );

  return (
    <TopNavigation
      style={styles.container}
      accessoryLeft={
        showBackButton ? (
          <TopNavigationAction icon={BackIcon} onPress={goBack} />
        ) : undefined
      }
      accessoryRight={renderRightActions}
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
