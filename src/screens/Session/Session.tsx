import {useState} from 'react';

import {StyleSheet} from 'react-native';

import {Tab, TabView, Button} from '@ui-kitten/components';

import {AppLayout, View} from 'src/components';
import {useSession} from 'src/context';
import {theme} from 'src/theme';
import {isEmpty} from 'src/utils';

import Batsmen from './Player/Batsmen';
import Bowler from './Player/Bowler';
import PlayerSelect from './PlayerSelect';

const Session = () => {
  const {selectedBatsmen, selectedBowler, handleStartTime, handleSessionReset} =
    useSession();

  const [tabIndex, setTabIndex] = useState(0);
  const [showTabs, setShowTabs] = useState(false);

  const handleStartSession = () => {
    handleStartTime();
    setShowTabs(true);
  };

  const onSessionReset = () => {
    handleSessionReset();
    setShowTabs(false);
  };

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
                  <Bowler />
                </Tab>
                <Tab title="BATMEN">
                  <Batsmen />
                </Tab>
              </TabView>
              <View row spread paddingV={10} paddingH={8}>
                <Button status="danger" size="small" onPress={onSessionReset}>
                  Cancel Session
                </Button>
                <Button size="medium">End Session</Button>
                <Button status="info" size="small">
                  Next Ball
                </Button>
              </View>
            </View>
          ) : (
            <PlayerSelect />
          )}
          {!showTabs && (
            <View paddingH={20}>
              <Button
                onPress={handleStartSession}
                disabled={isEmpty(selectedBatsmen) || isEmpty(selectedBowler)}>
                Start Session
              </Button>
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
