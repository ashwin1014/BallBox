import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  Button,
  ListItem,
  Divider,
} from '@ui-kitten/components';

import {BackIcon, Person, Edit} from 'src/assets';
import {AppLayout, View, Center} from 'src/components';
import {useAuthentication} from 'src/context';
import {theme} from 'src/theme';

const Profile = () => {
  const {goBack} = useNavigation();
  const {isAuthenticated, profile} = useAuthentication();
  console.log('profile', profile);

  return (
    <AppLayout showHeader={false}>
      <TopNavigation
        style={{backgroundColor: '#FFF'}}
        accessoryLeft={<TopNavigationAction icon={BackIcon} onPress={goBack} />}
        accessoryRight={
          isAuthenticated ? <TopNavigationAction icon={Edit} /> : <></>
        }
      />
      <View style={styles.container}>
        {isAuthenticated ? (
          <>
            <View style={styles.dropContainer} />
            <View style={styles.infoWrapper}>
              <View aiCenter>
                {profile?.photo ? (
                  <Avatar source={{uri: profile.photo}} shape="round" />
                ) : (
                  <Button
                    disabled
                    accessoryLeft={<Person height={40} width={40} />}
                    style={styles.avatarIcon}
                  />
                )}
                <View marginV={10}>
                  {profile?.name ? (
                    <Text category="s1">{profile?.name}</Text>
                  ) : null}
                  <Text category="s2">{profile?.phone}</Text>
                  <Text category="s2">{profile?.email}</Text>
                </View>
                <View marginV={20}>
                  <ListItem
                    title={'Premium User'}
                    description={profile?.isPremiumUser ? 'Yes' : 'No'}
                    style={{width: '100%'}}
                  />
                  <Divider />
                </View>
              </View>
            </View>
          </>
        ) : (
          <Center>
            <Text category="h5">Please Login to view profile</Text>
          </Center>
        )}
      </View>
    </AppLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  dropContainer: {
    backgroundColor: theme.palette.p8,
    height: 120,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  infoWrapper: {
    top: -55,
  },
  avatarIcon: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 3,
    backgroundColor: 'transparent',
    borderColor: theme.colors.link,
  },
});
