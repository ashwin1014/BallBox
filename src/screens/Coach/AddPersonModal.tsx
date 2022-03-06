import {useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {
  Button,
  Input,
  Text,
  Card,
  Modal,
  Layout,
  CheckBox,
  Spinner,
} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {v4 as uuidv4} from 'uuid';

import {useAuthentication} from 'src/context';
import {usersRef} from 'src/firebase';
import {commonStyles, theme} from 'src/theme';
import {Player, Roles} from 'src/types';
import {isEmpty} from 'src/utils';

interface AddPersonModalProps {
  visible: boolean;
  type: 'coach' | 'player';
  onCancel: () => void;
  //   onConfirm: () => void;
}

const INIT_PLAYER_STATE = {
  name: '',
  number: '',
  photo: '',
  style: '',
  specialty: '',
  order: '',
  role: [],
};

const AddPersonModal = ({
  visible,
  type,
  onCancel,
}: //   onConfirm,
AddPersonModalProps) => {
  const {userId, profile} = useAuthentication();
  const [player, setPlayer] = useState<Player>(INIT_PLAYER_STATE);
  const [playerRole, setPlayerRole] = useState<Roles[]>([]);
  const [loading, setLoading] = useState(false);
  //   const [coach, setCoach] = useState<UserProfile['coaches'] | Record<any, any>>(
  //     {},
  //   );

  const disableBtn = !player.name || !player.number || isEmpty(playerRole);

  const handleAddPlayer = (text: string, key: keyof Player) => {
    setPlayer(prev => ({...prev, [key]: text}));
  };

  const handlePlayerRole = (role: Roles) => {
    setPlayerRole(prev => {
      if (prev.includes(role)) {
        return prev.filter(item => item !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const handleConfirmAddPlayer = async () => {
    setLoading(true);
    const payload = {
      ...player,
      id: uuidv4(),
      role: playerRole,
    };
    try {
      const currentPlayers = profile?.players || [];
      const newPlayers = [...currentPlayers, payload];
      await usersRef.doc(userId).update({
        players: newPlayers,
      });
      setLoading(false);
      Toast.show({
        type: 'success',
        text2: 'Player added successfully',
      });
      onCancel();
    } catch (e) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Error adding player',
          text2: e.message,
        });
      }
    } finally {
      setLoading(false);
    }

    // console.log('payload', payload);
    // setLoading(false);
    // Toast.show({
    //   type: 'success',
    //   text2: 'Player added successfully',
    // });
    // onCancel();
  };

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <Layout level="1" style={styles.container}>
        <Card disabled={true} style={commonStyles.flexGrow1}>
          <Text>Add new {type === 'coach' ? 'Coach' : 'Player'}</Text>
          <View style={styles.body}>
            <Input
              style={styles.gap}
              value={player.name}
              label="Player Name"
              onChangeText={nextValue => handleAddPlayer(nextValue, 'name')}
            />
            <Input
              value={player.number}
              label="Player Number"
              accessoryLeft={() => <Text>+91</Text>}
              style={styles.gap}
              onChangeText={nextValue => handleAddPlayer(nextValue, 'number')}
            />
            <Input
              value={player.photo}
              label="Profile Picture"
              style={styles.gap}
              onChangeText={nextValue => handleAddPlayer(nextValue, 'photo')}
            />
            <Input
              value={player.style}
              label="Player Style"
              onChangeText={nextValue => handleAddPlayer(nextValue, 'style')}
            />
            <Input
              value={player.specialty}
              label="Player Specialty"
              style={styles.gap}
              onChangeText={nextValue =>
                handleAddPlayer(nextValue, 'specialty')
              }
            />
            <Input
              value={player.order}
              label="Player Order"
              style={styles.gap}
              onChangeText={nextValue => handleAddPlayer(nextValue, 'order')}
            />
            <View style={styles.gap}>
              <Text category="label" style={styles.label}>
                Player Role
              </Text>
              <CheckBox
                style={styles.checkbox}
                checked={playerRole.includes(Roles.BATSMAN)}
                onChange={() => handlePlayerRole(Roles.BATSMAN)}>
                Batsman
              </CheckBox>
              <CheckBox
                style={styles.checkbox}
                checked={playerRole.includes(Roles.BOWLER)}
                onChange={() => handlePlayerRole(Roles.BOWLER)}>
                Bowler
              </CheckBox>
            </View>
          </View>
          <View style={styles.modalFooter}>
            <Button
              size="small"
              onPress={onCancel}
              style={styles.cancelButton}
              appearance="outline">
              Cancel
            </Button>
            <Button
              disabled={disableBtn || loading}
              size="small"
              onPress={handleConfirmAddPlayer}
              style={styles.confirmButton}>
              {loading ? <Spinner /> : 'Confirm'}
            </Button>
          </View>
        </Card>
      </Layout>
    </Modal>
  );
};

export default AddPersonModal;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: theme.sizes.deviceWidth - 30,
  },
  body: {
    marginVertical: 15,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  confirmButton: {
    flexGrow: 1,
    marginLeft: 5,
  },
  cancelButton: {
    flexGrow: 1,
    marginRight: 5,
  },
  checkbox: {
    margin: 2,
  },
  gap: {
    marginBottom: 5,
  },
  label: {
    color: '#8F9BB3',
    marginBottom: 5,
  },
});
