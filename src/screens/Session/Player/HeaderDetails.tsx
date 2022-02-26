import {Text, Card} from '@ui-kitten/components';
import {format, parseISO} from 'date-fns';

import {Edit} from 'src/assets';
import {Space, View, IconButton} from 'src/components';
import {useToggle} from 'src/hooks';

import styles from './styles';

interface HeaderDetailsProps {
  playerName: string;
  startTime: string | undefined;
  deliveryNumber: number;
}

const HeaderDetails = ({
  playerName,
  startTime,
  deliveryNumber,
}: HeaderDetailsProps) => {
  const [, toggleShowPlayers] = useToggle(false);

  return (
    <View style={styles.header}>
      <Card style={styles.card} status="info">
        <View row>
          <Space>
            <Text category="s2">Name:</Text>
            <Space>
              <Text category="p1">{playerName}</Text>
              <View>
                <IconButton icon={<Edit />} onPress={toggleShowPlayers} />
                {/* {showPlayers && <PlayerSelect type={Roles.BOWLER} />} */}
              </View>
            </Space>
          </Space>
        </View>
        <View row>
          <Space>
            <Text category="s2">Start Time: </Text>
            <Text category="p1">
              {startTime && format(parseISO(startTime), 'dd LLL yyyy, h:mm a')}
            </Text>
          </Space>
        </View>
        <View row>
          <Space>
            <Text category="s2">Ball No:</Text>
            <Text category="p1">{deliveryNumber}</Text>
          </Space>
        </View>
      </Card>
    </View>
  );
};

export default HeaderDetails;
