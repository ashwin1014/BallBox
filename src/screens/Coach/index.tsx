import {StyleSheet} from 'react-native';

import {
  Text,
  Button,
  List,
  ListItem,
  Avatar,
  Divider,
} from '@ui-kitten/components';

import {Person} from 'src/assets';
import {AppLayout, View, Space} from 'src/components';
import {useAuthentication} from 'src/context';
import {useToggle} from 'src/hooks';

import AddPersonModal from './AddPersonModal';

const Coach = () => {
  const {isAuthenticated, handleSignOut, profile} = useAuthentication();
  const [visible, setVisible] = useToggle(false);
  // console.log(profile?.players ?? []);
  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          {isAuthenticated ? (
            <>
              <View style={styles.content}>
                <Text category="s1">Players</Text>
                <List
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
                />
              </View>
              <View style={styles.addSection}>
                <Button onPress={() => {}} style={styles.coachBtn} disabled>
                  Add New Coach
                </Button>
                <Button onPress={setVisible} style={styles.playerBtn}>
                  Add New Player
                </Button>
              </View>
            </>
          ) : (
            <Space direction="vertical">
              <Text>Please login as a regular user to add coach/players</Text>
              <Button onPress={handleSignOut}>Login</Button>
            </Space>
          )}
        </View>
      </AppLayout>
      {visible && (
        <AddPersonModal visible={visible} type="player" onCancel={setVisible} />
      )}
    </>
  );
};

export default Coach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addSection: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 80,
    justifyContent: 'space-between',
  },
  coachBtn: {
    flexGrow: 1,
    marginRight: 5,
  },
  playerBtn: {
    flexGrow: 1,
    marginLeft: 5,
  },
  content: {
    marginHorizontal: 20,
  },
  listContainer: {
    maxHeight: 220,
  },
});
