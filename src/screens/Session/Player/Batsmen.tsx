import {useState, useRef, useMemo} from 'react';

import {ScrollView} from 'react-native';

import RnBottomSheet from '@gorhom/bottom-sheet';
import {Text, Layout, Button, Radio} from '@ui-kitten/components';

import {View, BottomSheet} from 'src/components';
import {useSession} from 'src/context';
import {batsmanLength, batsmanStroke, wicket, runs} from 'src/context/mock';
import {Roles} from 'src/types';
import {isEmpty} from 'src/utils';

import PlayerSelect from '../PlayerSelect';
import HeaderDetails from './HeaderDetails';
import SessionActions from './SessionActions';
import styles from './styles';

const INIT_STATE_DETAIL = {
  length: '',
  stroke: '',
};

const INIT_STATE_ACC = {
  runs: 0,
  wicket: '',
};

const Batsman = () => {
  const {
    selectedBatsmen,
    batsmanSessionTime,
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
    () => ['2%', modalType === 'wicket' ? '42%' : '45%'],
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
      setBallDetail(prev => ({...prev, length: 'run'}));
    } else {
      setBallDetail(prev => ({...prev, length: 'wicket'}));
    }
    handleSheetClose();
  };

  const onCancelSession = () => {
    setStartSession(false);
    handleSessionReset(Roles.BATSMAN);
    setBallDetail(INIT_STATE_DETAIL);
  };

  const onStartSession = () => {
    handleStartTime(Roles.BATSMAN);
    setStartSession(true);
  };

  const playerName = selectedBatsmen?.name ?? '';
  const startTime = batsmanSessionTime.start ?? '';

  return (
    <Layout style={styles.tabContainer}>
      {!sessionStart ? (
        <>
          <PlayerSelect type={Roles.BATSMAN} />
          <Button disabled={isEmpty(playerName)} onPress={onStartSession}>
            Start Session
          </Button>
        </>
      ) : (
        <>
          <HeaderDetails
            playerName={playerName}
            startTime={startTime}
            deliveryNumber={deliveryNumber}
          />
          <ScrollView style={styles.inputsContainer}>
            <View row spread>
              <View>
                <Text category="h5" style={styles.label}>
                  Stroke
                </Text>
                {batsmanStroke.map(({key, value}) => (
                  <View style={styles.controlContainer} key={key}>
                    <Radio
                      style={styles.radio}
                      status="control"
                      checked={ballDetail.stroke === key}
                      onChange={() => handleDetail('stroke')(key)}>
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
                {batsmanLength.map(({key, value}) => (
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
          <SessionActions
            onCancelSession={onCancelSession}
            handleNextBall={handleNextBall}
            disableNextBall={
              isEmpty(ballDetail.length) || isEmpty(ballDetail.stroke)
            }
          />
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

export default Batsman;
