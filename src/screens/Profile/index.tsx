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
import {format, parseISO} from 'date-fns';

import {BackIcon, Person, Edit} from 'src/assets';
import {AppLayout, View, Center} from 'src/components';
import {useAuthentication} from 'src/context';
import {theme} from 'src/theme';

const Profile = () => {
  const {goBack} = useNavigation();
  const {isAuthenticated, profile} = useAuthentication();
  // console.log('profile', profile);

  return (
    <AppLayout showHeader={false}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryLeft={<TopNavigationAction icon={BackIcon} onPress={goBack} />}
        accessoryRight={
          isAuthenticated ? <TopNavigationAction icon={Edit} /> : <></>
        }
      />
      <View flex>
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
                <View marginV={10} aiCenter>
                  {profile?.name ? (
                    <Text category="s1">{profile?.name}</Text>
                  ) : null}
                  <Text category="label">{profile?.phone}</Text>
                </View>
                <View marginV={20}>
                  <ListItem
                    title={'Email'}
                    description={profile?.email ? profile?.email : '-'}
                    style={styles.listStyle}
                  />
                  <Divider />
                  <ListItem
                    title={'Academy'}
                    description={profile?.academy ? profile?.academy : '-'}
                    style={styles.listStyle}
                  />
                  <Divider />
                  <ListItem
                    title={'Premium User'}
                    description={profile?.isPremiumUser ? 'Yes' : 'No'}
                    style={styles.listStyle}
                  />
                  <Divider />
                  <ListItem
                    title={'Member Since'}
                    description={
                      profile?.createdDate &&
                      format(parseISO(profile?.createdDate), 'dd LLL yyyy')
                    }
                    style={styles.listStyle}
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
  topNavigation: {
    backgroundColor: theme.palette.p8,
  },
  dropContainer: {
    backgroundColor: theme.palette.p8,
    height: 80,
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
  listStyle: {
    width: '100%',
  },
});
