import {StyleSheet} from 'react-native';

import {Button, Layout, Text} from '@ui-kitten/components';

import {HeartIcon} from 'src/assets';

export default () => (
  <>
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        Welcome to BallBox
      </Text>
      <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
        LIKE
      </Button>
    </Layout>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
