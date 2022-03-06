import {useCallback, useState} from 'react';

import {StyleSheet} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Text, Button, List, ListItem, Divider} from '@ui-kitten/components';
import {format, parseISO} from 'date-fns';

import {ChevronRight} from 'src/assets';
import {AppLayout, View, Space, IconButton} from 'src/components';
import {MAIN_STACK} from 'src/constants';
import {useAuthentication} from 'src/context';
import {db} from 'src/firebase';
import {SessionDetailScreenProp} from 'src/navigation/navigationProps';
import {theme} from 'src/theme';
import {BattingSession, BowlerSession} from 'src/types';
// import {isEmpty} from 'src/utils';

const Analysis = () => {
  const {navigate} = useNavigation<SessionDetailScreenProp>();
  const {isAuthenticated, handleSignOut, userId} = useAuthentication();
  const [bowlingSession, setBowlingSession] = useState<BowlerSession[]>();
  const [battingSession, setBattingSession] = useState<BattingSession[]>();

  const fetchBattingData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const doc = await db
          .collection('session')
          .doc(userId)
          .collection('batting_session')
          .get();
        const data = doc.docs.map(doc => doc.data());
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
        setBowlingSession(data as BowlerSession[]);
      } catch (e) {}
    }
  }, [isAuthenticated, userId]);

  const handleSessionDetailNavigation = (
    session: BattingSession | BowlerSession,
    sessionType: 'batting' | 'bowling',
  ) => {
    navigate(MAIN_STACK.SESSION_DETAILS, {session, sessionType});
  };

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
              <View>
                <Text category="h5">Batting Sessions</Text>
                <List
                  data={battingSession || []}
                  style={styles.listContainer}
                  keyExtractor={({sessionId}) => String(sessionId)}
                  ItemSeparatorComponent={Divider}
                  ListEmptyComponent={<Text>No batting sessions found</Text>}
                  renderItem={({item}) => (
                    <>
                      <ListItem
                        title={format(
                          parseISO(item.startTime),
                          'dd LLL yyyy, h:mm a',
                        )}
                        description={'Shots Recorded: ' + item.shot.length}
                        onPress={() =>
                          handleSessionDetailNavigation(item, 'batting')
                        }
                        accessoryRight={() => (
                          <IconButton
                            icon={<ChevronRight />}
                            onPress={() =>
                              handleSessionDetailNavigation(item, 'batting')
                            }
                          />
                        )}
                      />
                    </>
                  )}
                />
              </View>
              <View style={styles.separator} />
              <View>
                <Text category="h5">Bowling Sessions</Text>
                <List
                  data={bowlingSession || []}
                  style={styles.listContainer}
                  keyExtractor={({sessionId}) => String(sessionId)}
                  ItemSeparatorComponent={Divider}
                  ListEmptyComponent={<Text>No batting sessions found</Text>}
                  renderItem={({item}) => (
                    <>
                      <ListItem
                        title={format(
                          parseISO(item.startTime),
                          'dd LLL yyyy, h:mm a',
                        )}
                        description={'Balls Played: ' + item.balls.length}
                        onPress={() =>
                          handleSessionDetailNavigation(item, 'bowling')
                        }
                        accessoryRight={() => (
                          <IconButton
                            icon={<ChevronRight />}
                            onPress={() =>
                              handleSessionDetailNavigation(item, 'bowling')
                            }
                          />
                        )}
                      />
                    </>
                  )}
                />
              </View>
              {/* <List
                data={profile?.players ?? []}
                style={styles.listContainer}
                keyExtractor={({id}) => String(id)}
                ItemSeparatorComponent={Divider}
                ListEmptyComponent={<Text>No Players Added</Text>}
                renderItem={({item}) => (
                  <>
                    <ListItem
                      title={item.name}
                      description={item.role?.join(', ').toLocaleLowerCase()}
                      onPress={() => handlePlayerSelect(item.id)}
                      accessoryRight={() => (
                        <IconButton
                          icon={<ChevronRight />}
                          onPress={() => handlePlayerSelect(item.id)}
                        />
                      )}
                      accessoryLeft={() =>
                        item?.photo ? (
                          <Avatar
                            source={{uri: item.photo}}
                            shape="round"
                            size="tiny"
                          />
                        ) : (
                          <Person />
                        )
                      }
                    />
                  </>
                )}
              /> */}
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
    padding: 10,
  },
  listContainer: {
    backgroundColor: theme.colors.background,
    maxHeight: 220,
    marginTop: 10,
  },
  separator: {
    height: 30,
  },
});
