import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Button, Text} from '@ui-kitten/components';

import {AppLayout, View} from 'src/components';
import {MAIN_TABS} from 'src/constants';
import {useAuthentication} from 'src/context';
import {
  AnalysisTabScreenProp,
  CoachTabScreenProp,
  SessionTabScreenProp,
} from 'src/navigation/navigationProps';
// import {theme} from 'src/theme';

type TabRouteProps = AnalysisTabScreenProp &
  CoachTabScreenProp &
  SessionTabScreenProp;

const Home = () => {
  const {navigate} = useNavigation<TabRouteProps>();
  const {isAuthenticated, handleSignOut, isGuestUser} = useAuthentication();
  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          <Text style={styles.text} category="h1">
            Welcome to BallBox
          </Text>
          <Button
            style={styles.likeButton}
            onPress={() => navigate(MAIN_TABS.SESSION)}>
            Create Session
          </Button>
          <Button
            style={styles.likeButton}
            onPress={() => navigate(MAIN_TABS.COACH)}>
            Edit Coach
          </Button>
          <Button
            style={styles.likeButton}
            onPress={() => navigate(MAIN_TABS.ANALYSIS)}>
            Analyse Player
          </Button>
          {isGuestUser && !isAuthenticated && (
            <Text>Logged in as guest user</Text>
          )}
          <Button appearance="outline" onPress={handleSignOut}>
            {isAuthenticated ? 'Sign Out' : 'Sign In as Regular User'}
          </Button>
        </View>
      </AppLayout>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
