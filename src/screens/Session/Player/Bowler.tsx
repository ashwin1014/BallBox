import {useState, useRef, useMemo} from 'react';

import {ScrollView} from 'react-native';

import RnBottomSheet from '@gorhom/bottom-sheet';
import {Text, Layout, Button, Radio, Card} from '@ui-kitten/components';
import {format, parseISO} from 'date-fns';

import {Space, View, BottomSheet} from 'src/components';
import {useSession} from 'src/context';
import {bowlerLengths, bowlerAccuracies, wicket, runs} from 'src/context/mock';
import {commonStyles} from 'src/theme';
import {Roles} from 'src/types';
import {isEmpty} from 'src/utils';

import PlayerSelect from '../PlayerSelect';
import styles from './styles';

const INIT_STATE_DETAIL = {
  length: '',
  accuracy: '',
};

const INIT_STATE_ACC = {
  runs: 0,
  wicket: '',
};

const Bowler = () => {
  const {
    selectedBowler,
    bowlerSessionTime,
    handleSessionReset,
    handleStartTime,
  } = useSession();
  const [deliveryNumber, setDeliveryNumber] = useState(1);
  const [sessionStart, setStartSession] = useState(false);
  const [ballDetail, setBallDetail] =
    useState<typeof INIT_STATE_DETAIL>(INIT_STATE_DETAIL);
  const [modalType, setModalType] = useState<'wicket' | 'run'>();
  const [accuracyDetail, setAccuracyDetail] = useState(INIT_STATE_ACC);
  const bottomSheetRef = useRef<RnBottomSheet>(null);

  const snapPoints = useMemo(
    () => ['2%', modalType === 'wicket' ? '35%' : '45%'],
    [modalType],
  );
  // console.log(ballDetail);

  const handleSheetClose = (): void => bottomSheetRef?.current?.close();
  const handleSheetOpen = (): void => bottomSheetRef?.current?.expand();

  const handleDeliveryCounter = () => setDeliveryNumber(prev => prev + 1);

  const handleNextBall = () => {
    handleDeliveryCounter();
    setBallDetail(INIT_STATE_DETAIL);
    setAccuracyDetail(INIT_STATE_ACC);
  };

  const handleDetail = (type: string) => (value: string) => {
    if (value === 'run' || value === 'wicket') {
      setModalType(value);
      handleSheetOpen();
      return;
    }
    setBallDetail(prev => ({...prev, [type]: value}));
  };

  const handleAccuracyDetail = (type: string, value: string | number) => {
    setAccuracyDetail(prev => ({...prev, [type]: value}));
    if (type === 'runs') {
      setBallDetail(prev => ({...prev, accuracy: 'run'}));
    } else {
      setBallDetail(prev => ({...prev, accuracy: 'wicket'}));
    }
    handleSheetClose();
  };

  const onCancelSession = () => {
    setStartSession(false);
    handleSessionReset(Roles.BOWLER);
    setBallDetail(INIT_STATE_DETAIL);
  };

  const onStartSession = () => {
    handleStartTime(Roles.BOWLER);
    setStartSession(true);
  };

  const playerName = selectedBowler?.name ?? '';
  const startTime = bowlerSessionTime.start ?? '';

  return (
    <Layout style={styles.tabContainer}>
      {!sessionStart ? (
        <>
          <PlayerSelect type={Roles.BOWLER} />
          <Button disabled={isEmpty(playerName)} onPress={onStartSession}>
            Start Session
          </Button>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Card style={styles.card} status="info">
              <View row>
                <Space>
                  <Text category="s2">Name:</Text>
                  <Text category="p1">{playerName}</Text>
                </Space>
              </View>
              <View row>
                <Space>
                  <Text category="s2">Start Time: </Text>
                  <Text category="p1">
                    {startTime &&
                      format(parseISO(startTime), 'dd LLL yyyy, h:mm a')}
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
          <ScrollView style={styles.inputsContainer}>
            <View row spread>
              <View>
                <Text category="h5" style={styles.label}>
                  Accuracy
                </Text>
                {bowlerAccuracies.map(({key, value}) => (
                  <View style={styles.controlContainer} key={key}>
                    <Radio
                      style={styles.radio}
                      status="control"
                      checked={ballDetail.accuracy === key}
                      onChange={() => handleDetail('accuracy')(key)}>
                      {value}
                    </Radio>
                  </View>
                ))}
              </View>
              <View style={styles.separator} />
              <View>
                <Text category="h5" style={styles.label}>
                  Length
                </Text>
                {bowlerLengths.map(({key, value}) => (
                  <View style={styles.controlContainer} key={key}>
                    <Radio
                      style={styles.radio}
                      status="control"
                      checked={ballDetail.length === key}
                      onChange={() => handleDetail('length')(key)}>
                      {value}
                    </Radio>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          <View row spread paddingH={8} style={commonStyles.mtAuto}>
            <Button status="danger" size="small" onPress={onCancelSession}>
              Cancel Session
            </Button>
            <Button size="medium">End Session</Button>
            <Button
              status="info"
              size="small"
              onPress={handleNextBall}
              disabled={
                isEmpty(ballDetail.length) || isEmpty(ballDetail.accuracy)
              }>
              Next Ball
            </Button>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleSheetClose={handleSheetClose}
            title={`Select ${modalType}`}
            titleStyle={styles.sheetTitle}>
            <View>
              {modalType === 'run' ? (
                <>
                  {runs.map(value => (
                    <View key={value} style={styles.radio}>
                      <Radio
                        style={styles.radio}
                        status="primary"
                        checked={accuracyDetail.runs === value}
                        onChange={() => handleAccuracyDetail('runs', value)}>
                        {value === 0
                          ? 'No Run'
                          : value === 1
                          ? '1 Run'
                          : `${value} Runs`}
                      </Radio>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  {wicket.map(({key, value}) => (
                    <View key={key} style={styles.radio}>
                      <Radio
                        style={styles.radio}
                        status="primary"
                        checked={accuracyDetail.wicket === key}
                        onChange={() => handleAccuracyDetail('wicket', key)}>
                        {value}
                      </Radio>
                    </View>
                  ))}
                </>
              )}
            </View>
          </BottomSheet>
        </>
      )}
    </Layout>
  );
};

export default Bowler;
