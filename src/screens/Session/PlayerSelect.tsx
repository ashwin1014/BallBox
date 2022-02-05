import {StyleSheet} from 'react-native';

import {
  Layout,
  Text,
  Select,
  SelectItem,
  Avatar,
  IndexPath,
} from '@ui-kitten/components';

import {View} from 'src/components';
import {useSession} from 'src/context';
import {Roles} from 'src/types';

const PlayerSelect = ({type}: {type: Roles}) => {
  const {
    players,
    selectedBatsmenIndex,
    selectedBowlerIndex,
    setSelectedBatsmenIndex,
    setSelectedBowlerIndex,
    selectedBatsmen,
    selectedBowler,
  } = useSession();

  return (
    <View style={styles.selectContainer}>
      {type === Roles.BATSMAN && (
        <Layout style={styles.playerSelect}>
          <Text category="h6" style={styles.title}>
            Select Batsmen
          </Text>
          <Select
            value={selectedBatsmen?.name ?? ''}
            selectedIndex={selectedBatsmenIndex}
            onSelect={index => setSelectedBatsmenIndex(index as IndexPath)}>
            {players?.map(player => (
              <SelectItem
                title={player.name}
                key={player.id}
                accessoryLeft={() => (
                  <Avatar
                    source={{uri: player.photo}}
                    shape="round"
                    size="tiny"
                  />
                )}
              />
            ))}
          </Select>
        </Layout>
      )}
      {type === Roles.BOWLER && (
        <Layout style={styles.playerSelect}>
          <Text category="h6" style={styles.title}>
            Select Bowler
          </Text>
          <Select
            value={selectedBowler?.name ?? ''}
            selectedIndex={selectedBowlerIndex}
            onSelect={index => setSelectedBowlerIndex(index as IndexPath)}>
            {players?.map(player => (
              <SelectItem
                title={player.name}
                key={player.id}
                accessoryLeft={() => (
                  <Avatar
                    source={{uri: player.photo}}
                    shape="round"
                    size="tiny"
                  />
                )}
              />
            ))}
          </Select>
        </Layout>
      )}
    </View>
  );
};

export default PlayerSelect;

const styles = StyleSheet.create({
  selectContainer: {
    marginTop: 30,
    padding: 20,
  },
  playerSelect: {
    marginBottom: 50,
  },
  title: {
    marginTop: -30,
  },
});
