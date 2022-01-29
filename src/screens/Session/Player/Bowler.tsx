// import {StyleSheet} from 'react-native';

import {Text, Layout} from '@ui-kitten/components';
import {format, parseISO} from 'date-fns';

import {Space, View} from 'src/components';
import {useSession} from 'src/context';

import styles from './styles';

const Bowler = () => {
  const {selectedBowler, sessionTime} = useSession();

  const playerName = selectedBowler?.name;
  const startTime = sessionTime.start;

  return (
    <Layout style={styles.tabContainer}>
      <View row>
        <Space>
          <Text>Name:</Text>
          <Text>{playerName}</Text>
        </Space>
      </View>
      <View row>
        <Space>
          <Text>Start Time: </Text>
          <Text>{format(parseISO(startTime), 'dd LLL yyyy, h:mm a')}</Text>
        </Space>
      </View>
    </Layout>
  );
};

export default Bowler;
