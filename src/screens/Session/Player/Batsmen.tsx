// import {StyleSheet} from 'react-native';

import {Text, Layout, Button} from '@ui-kitten/components';
import {format, parseISO} from 'date-fns';

import {View, Space} from 'src/components';
import {useSession} from 'src/context';
import {Roles} from 'src/types';
import {isEmpty} from 'src/utils';

import PlayerSelect from '../PlayerSelect';
import styles from './styles';

const Batsmen = () => {
  const {selectedBatsmen, batsmanSessionTime} = useSession();

  const playerName = selectedBatsmen?.name ?? '';
  const startTime = batsmanSessionTime.start ?? '';

  return (
    <Layout style={styles.tabContainer}>
      {!isEmpty(playerName) ? (
        <>
          <View row>
            <Space>
              <Text>Name:</Text>
              <Text>{playerName}</Text>
            </Space>
          </View>
          <View row>
            <Space>
              <Text>Start Time: </Text>
              <Text>
                {startTime &&
                  format(parseISO(startTime), 'dd LLL yyyy, h:mm a')}
              </Text>
            </Space>
          </View>
          <View row spread paddingV={10} paddingH={8}>
            <Button status="danger" size="small">
              Cancel Session
            </Button>
            <Button size="medium">End Session</Button>
            <Button status="info" size="small">
              Next Ball
            </Button>
          </View>
        </>
      ) : (
        <PlayerSelect type={Roles.BATSMAN} />
      )}
    </Layout>
  );
};

export default Batsmen;
