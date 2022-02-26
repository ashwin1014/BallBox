import {useState, useRef, useMemo, useEffect, useCallback} from 'react';

import {ScrollView} from 'react-native';

import RnBottomSheet from '@gorhom/bottom-sheet';
import {Text, Layout, Button, Radio} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {useImmer} from 'use-immer';
import {v4 as uuidv4} from 'uuid';

import {View, BottomSheet, OverlaySpinner} from 'src/components';
import {useSession, useAuthentication} from 'src/context';
import {bowlerLengths, bowlerAccuracies, wicket, runs} from 'src/context/mock';
import {db} from 'src/firebase';
import {Roles, Ball, BowlerSession} from 'src/types';
import {isEmpty} from 'src/utils';

import PlayerSelect from '../PlayerSelect';
import HeaderDetails from './HeaderDetails';
import SessionActions from './SessionActions';
import styles from './styles';

const INIT_STATE_DETAIL = {
  length: '',
  accuracy: '',
};

const INIT_STATE_ACC = {
  runs: 0,
  wicketType: 'bowled',
};

const Bowler = () => {
  const {userId} = useAuthentication();
  const {
    selectedBowler,
    bowlerSessionTime,
    handleSessionReset,
    handleStartTime,
  } = useSession();
  const [sessionStart, setStartSession] = useState(false);
  const [endActiveSession, setEndActiveSession] = useState(false);
  const [modalType, setModalType] = useState<'wicket' | 'run'>();
  const [ballDetail, setBallDetail] =
    useState<typeof INIT_STATE_DETAIL>(INIT_STATE_DETAIL);
  const [accuracyDetail, setAccuracyDetail] =
    useState<typeof INIT_STATE_ACC>(INIT_STATE_ACC);
  const [deliveryNumber, setDeliveryNumber] = useState(1);
  const [balls, setBalls] = useImmer<Ball[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomSheetRef = useRef<RnBottomSheet>(null);

  const playerName = selectedBowler?.name ?? '';
  const startTime = bowlerSessionTime.start ?? '';

  const snapPoints = useMemo(
    () => ['2%', modalType === 'wicket' ? '35%' : '45%'],
    [modalType],
  );
  // console.log({balls: isEmpty(balls)});

  const handleSheetClose = (): void => bottomSheetRef?.current?.close();
  const handleSheetOpen = (): void => bottomSheetRef?.current?.expand();

  const handleDeliveryCounter = () => setDeliveryNumber(prev => prev + 1);
  const handleStateReset = useCallback(
    (isEnd = false) => {
      setBallDetail(INIT_STATE_DETAIL);
      setAccuracyDetail(INIT_STATE_ACC);
      if (isEnd) {
        setBalls([]);
        setEndActiveSession(false);
      }
    },
    [setBalls],
  );

  const handleNextBall = () => {
    const currentBallPayload = {
      playerId: selectedBowler?.id,
      playerName: selectedBowler?.name,
      deliveryNumber,
      ...ballDetail,
      ...accuracyDetail,
    };
    setBalls(draft => {
      draft.push(currentBallPayload);
    });
    // console.log(currentBallPayload);
    handleDeliveryCounter();
    handleStateReset();
  };

  const handleSessionEnd = () => {
    handleNextBall();
    setEndActiveSession(true);
  };

  const onCancelSession = () => {
    setStartSession(false);
    handleSessionReset(Roles.BOWLER);
    handleStateReset(true);
  };

  const onStartSession = () => {
    handleStartTime(Roles.BOWLER);
    setStartSession(true);
  };

  const saveSessionDetails = useCallback(async () => {
    const endTime = new Date().toISOString();
    const sessionId = uuidv4();
    const sessionPayload: BowlerSession = {
      userId,
      sessionId,
      startTime,
      endTime,
      type: 'bowler',
      balls,
    };
    // console.log(sessionPayload);
    // handleStateReset(true);
    if (balls.length > 0) {
      setLoading(true);
      try {
        await db
          .collection('bowling_session')
          .doc(userId)
          .collection('user_bowling_session')
          .doc(sessionId)
          .set(sessionPayload);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Session saved successfully',
        });
        onCancelSession();
      } catch (e) {
        if (e instanceof Error) {
          console.error('saveSessionDetails', e.message);
          Toast.show({
            type: 'error',
            text1: 'Error saving session',
            text2: e.message,
          });
        }
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balls, startTime, userId]);

  const handleDetail = (type: string) => (value: string) => {
    if (value === 'run' || value === 'wicket') {
      setModalType(value);
      handleSheetOpen();
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

  useEffect(() => {
    if (endActiveSession) {
      saveSessionDetails();
    }
  }, [endActiveSession, saveSessionDetails]);

  return (
    <>
      <OverlaySpinner loading={loading} />
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
            <HeaderDetails
              playerName={playerName}
              startTime={startTime}
              deliveryNumber={deliveryNumber}
            />
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
            <SessionActions
              onCancelSession={onCancelSession}
              handleNextBall={handleNextBall}
              disableNextBall={
                isEmpty(ballDetail.length) || isEmpty(ballDetail.accuracy)
              }
              disableEndSession={isEmpty(balls)}
              handleSessionEnd={handleSessionEnd}
            />
          </>
        )}
      </Layout>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetClose={handleSheetClose}
        title={`Select ${modalType}`}
        titleStyle={styles.sheetTitle}>
        <>
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
            <ScrollView style={{height: 140}}>
              {wicket.map(({key, value}) => (
                <View key={key} style={styles.radio}>
                  <Radio
                    style={styles.radio}
                    status="primary"
                    checked={accuracyDetail.wicketType === key}
                    onChange={() => handleAccuracyDetail('wicket', key)}>
                    {value}
                  </Radio>
                </View>
              ))}
            </ScrollView>
          )}
        </>
      </BottomSheet>
    </>
  );
};

export default Bowler;
