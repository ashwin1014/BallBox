import {useState} from 'react';

import {StyleSheet} from 'react-native';

import {Tab, TabView} from '@ui-kitten/components';

import {AppLayout, View} from 'src/components';
import {theme} from 'src/theme';

import Batsmen from './Player/Batsmen';
import Bowler from './Player/Bowler';

const Session = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <AppLayout>
        <View style={styles.container}>
          <View>
            <TabView
              selectedIndex={tabIndex}
              onSelect={index => setTabIndex(index)}>
              <Tab title="BOWLER">
                <Bowler />
              </Tab>
              <Tab title="BATSMAN">
                <Batsmen />
              </Tab>
            </TabView>
          </View>
        </View>
      </AppLayout>
    </>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabContainer: {
    // height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContainer: {
    marginTop: 30,
  },
  playerSelect: {
    marginBottom: 50,
  },
});
