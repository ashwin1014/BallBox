import {useState} from 'react';

import {StyleSheet} from 'react-native';

import {
  Layout,
  Tab,
  TabView,
  Text,
  Select,
  SelectItem,
  Avatar,
} from '@ui-kitten/components';

import {AppLayout, View} from 'src/components';
import {useAuthentication} from 'src/context';
// import {theme} from 'src/theme';

const Session = () => {
  const {profile} = useAuthentication();
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showTabs, setShowTabs] = useState(false);
  const [selectedBatsmenIndex, setSelectedBatsmenIndex] = useState();
  // const [player, setPlayer] = useState({
  //   batsmen: '',
  //   bowler: '',
  // });

  // console.log(selectedBatsmenIndex)

  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          {showTabs ? (
            <View>
              <TabView
                selectedIndex={tabIndex}
                onSelect={index => setTabIndex(index)}>
                <Tab title="BOWLER">
                  <Layout style={styles.tabContainer}>
                    <Text category="h5">BOWLER</Text>
                  </Layout>
                </Tab>
                <Tab title="BATMEN">
                  <Layout style={styles.tabContainer}>
                    <Text category="h5">BATMEN</Text>
                  </Layout>
                </Tab>
              </TabView>
            </View>
          ) : (
            <View>
              <View>
                <View>
                  <Layout style={styles.container} level="1">
                    <Select
                      label="Select Batsmen"
                      // caption="Caption"
                      selectedIndex={selectedBatsmenIndex}
                      // @ts-ignore
                      onSelect={index => setSelectedBatsmenIndex(index)}>
                      {profile?.players?.map(player => (
                        <SelectItem
                          title={player.name}
                          key={player.id}
                          accessoryLeft={
                            <Avatar source={{uri: player.photo}} />
                          }
                        />
                      ))}
                    </Select>
                  </Layout>
                </View>
                {/* <View>
                  <Text category="c2">Select Bowler</Text>
                </View> */}
              </View>
            </View>
          )}
        </View>
      </AppLayout>
    </>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  tabContainer: {
    // height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
