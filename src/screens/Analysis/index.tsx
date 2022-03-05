import {useCallback, useState} from 'react';

import {StyleSheet} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {Text, Button} from '@ui-kitten/components';

import {AppLayout, View, Space} from 'src/components';
import {useAuthentication} from 'src/context';
import {db} from 'src/firebase';
import {BattingSession, BowlerSession} from 'src/types';
// import {theme} from 'src/theme';

const Analysis = () => {
  const {isAuthenticated, handleSignOut, userId} = useAuthentication();
  const [bowlingSession, setBowlingSession] = useState<BowlerSession[]>();
  const [battingSession, setBattingSession] = useState<BattingSession[]>();

  console.log({bowlingSession});
  console.log({battingSession});

  const fetchBattingData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const doc = await db
          .collection('session')
          .doc(userId)
          .collection('batting_session')
          .get();
        const data = doc.docs.map(doc => doc.data());
        console.log('fetchBattingData', data);
        setBattingSession(data as BattingSession[]);
      } catch (e) {}
    }
  }, [isAuthenticated, userId]);

  const fetchBowlingData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const doc = await db
          .collection('session')
          .doc(userId)
          .collection('bowling_session')
          .get();
        const data = doc.docs.map(doc => doc.data());
        console.log('fetchBowlingData', data);
        setBowlingSession(data as BowlerSession[]);
      } catch (e) {}
    }
  }, [isAuthenticated, userId]);

  useFocusEffect(
    useCallback(() => {
      fetchBattingData();
      fetchBowlingData();
    }, [fetchBattingData, fetchBowlingData]),
  );

  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          {isAuthenticated ? (
            <>
              <Text>Analysis Screen</Text>
            </>
          ) : (
            <Space direction="vertical">
              <Text>Please login to get player analysis</Text>
              <Button onPress={handleSignOut}>Login</Button>
            </Space>
          )}
        </View>
      </AppLayout>
    </>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
