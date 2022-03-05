import {useState, useRef, useMemo, useCallback} from 'react';

import {ScrollView} from 'react-native';

import RnBottomSheet from '@gorhom/bottom-sheet';
import {Text, Layout, Button, Radio} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {useImmer} from 'use-immer';
import {v4 as uuidv4} from 'uuid';

import {View, BottomSheet, OverlaySpinner, ConfirmModal} from 'src/components';
import {useSession, useAuthentication} from 'src/context';
import {batsmanAccuracy, batsmanStroke, wicket, runs} from 'src/context/mock';
import {db} from 'src/firebase';
import {useToggle} from 'src/hooks';
import {Roles, BattingSession, Shot} from 'src/types';
import {isEmpty} from 'src/utils';

import PlayerSelect from '../PlayerSelect';
import HeaderDetails from './HeaderDetails';
import SessionActions from './SessionActions';
import styles from './styles';

const INIT_STATE_DETAIL = {
  accuracy: '',
  stroke: '',
};

const INIT_STATE_ACC = {
  runs: 0,
  wicketType: 'bowled',
};

const Batsman = () => {
  const {userId} = useAuthentication();
  const {
    selectedBatsmen,
    batsmanSessionTime,
    handleSessionReset,
    handleStartTime,
  } = useSession();
  const [deliveryNumber, setDeliveryNumber] = useState(1);
  const [sessionStart, setStartSession] = useState(false);
  const [shotDetail, setShotDetail] =
    useState<typeof INIT_STATE_DETAIL>(INIT_STATE_DETAIL);
  const [modalType, setModalType] = useState<'wicket' | 'run'>();
  const [accuracyDetail, setAccuracyDetail] = useState(INIT_STATE_ACC);
  const [shots, setShots] = useImmer<Shot[]>([]);
  const [loading, setLoading] = useState(false);
  const [endSessionConfirm, toggleEndSessionConfirm] = useToggle(false);
  const [cancelSessionConfirm, toggleCancelSessionConfirm] = useToggle(false);

  const bottomSheetRef = useRef<RnBottomSheet>(null);

  const snapPoints = useMemo(
    () => ['2%', modalType === 'wicket' ? '42%' : '45%'],
    [modalType],
  );
  // console.log(ballDetail);

  const handleSheetClose = (): void => bottomSheetRef?.current?.close();
  const handleSheetOpen = (): void => bottomSheetRef?.current?.expand();

  const handleDeliveryCounter = () => setDeliveryNumber(prev => prev + 1);

  const handleStateReset = useCallback(
    (isEnd = false) => {
      setShotDetail(INIT_STATE_DETAIL);
      setAccuracyDetail(INIT_STATE_ACC);
      if (isEnd) {
        setShots([]);
      }
    },
    [setShots],
  );

  const deliveryPayload = useMemo(
    () => ({
      playerId: selectedBatsmen?.id,
      playerName: selectedBatsmen?.name,
      deliveryNumber,
      ...shotDetail,
      ...accuracyDetail,
    }),
    [
      accuracyDetail,
      deliveryNumber,
      selectedBatsmen?.id,
      selectedBatsmen?.name,
      shotDetail,
    ],
  );

  const addShotDetails = () => {
    setShots(draft => {
      draft.push(deliveryPayload);
    });
  };

  const handleNextBall = () => {
    addShotDetails();
    handleDeliveryCounter();
    handleStateReset();
  };

  const handleCancelSession = (isCancel = false) => {
    setDeliveryNumber(1);
    setStartSession(false);
    handleSessionReset(Roles.BATSMAN);
    handleStateReset(true);
    if (isCancel) {
      toggleCancelSessionConfirm();
    }
  };

  const onStartSession = () => {
    handleStartTime(Roles.BATSMAN);
    setStartSession(true);
  };

  const saveSessionDetails = useCallback(
    async (sessionPayload: BattingSession) => {
      setLoading(true);
      try {
        await db
          .collection('session')
          .doc(userId)
          .collection('batting_session')
          .doc(sessionPayload.sessionId)
          .set(sessionPayload);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Session saved successfully',
        });
        handleCancelSession();
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const confirmSessionEnd = () => {
    const endTime = new Date().toISOString();
    const sessionId = uuidv4();

    const isLastDetailEmpty =
      isEmpty(shotDetail.accuracy) || isEmpty(shotDetail.stroke);

    const shotsPayload = isLastDetailEmpty
      ? shots
      : [...shots, deliveryPayload];

    const sessionPayload: BattingSession = {
      userId,
      sessionId,
      startTime,
      endTime,
      type: 'batting',
      shot: shotsPayload,
    };
    saveSessionDetails(sessionPayload);
    toggleEndSessionConfirm();
  };

  const handleDetail = (type: string) => (value: string) => {
    if (value === 'run' || value === 'wicket') {
      setModalType(value);
      handleSheetOpen();
    }
    setShotDetail(prev => ({...prev, [type]: value}));
  };

  const handleAccuracyDetail = (type: string, value: string | number) => {
    setAccuracyDetail(prev => ({...prev, [type]: value}));
    if (type === 'runs') {
      setShotDetail(prev => ({...prev, accuracy: 'run'}));
    } else {
      setShotDetail(prev => ({...prev, accuracy: 'wicket'}));
    }
    handleSheetClose();
  };

  const playerName = selectedBatsmen?.name ?? '';
  const startTime = batsmanSessionTime.start ?? '';

  return (
    <>
      <OverlaySpinner loading={loading} />
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
                        checked={shotDetail.stroke === key}
                        onChange={() => handleDetail('stroke')(key)}>
                        {value}
                      </Radio>
                    </View>
                  ))}
                </View>
                <View style={styles.separator} />
                <View>
                  <Text category="h5" style={styles.label}>
                    Accuracy
                  </Text>
                  {batsmanAccuracy.map(({key, value}) => (
                    <View style={styles.controlContainer} key={key}>
                      <Radio
                        style={styles.radio}
                        status="control"
                        checked={shotDetail.accuracy === key}
                        onChange={() => handleDetail('accuracy')(key)}>
                        {value}
                      </Radio>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
            <SessionActions
              onCancelSession={toggleCancelSessionConfirm}
              handleNextBall={handleNextBall}
              disableNextBall={
                isEmpty(shotDetail.accuracy) || isEmpty(shotDetail.stroke)
              }
              disableEndSession={isEmpty(shots)}
              handleSessionEnd={toggleEndSessionConfirm}
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
                          checked={accuracyDetail.wicketType === key}
                          onChange={() =>
                            handleAccuracyDetail('wicketType', key)
                          }>
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
      {cancelSessionConfirm && (
        <ConfirmModal
          visible={cancelSessionConfirm}
          onCancel={toggleCancelSessionConfirm}
          onConfirm={() => handleCancelSession(true)}
          title="Are you sure you want to cancel ongoing session?"
        />
      )}
      {endSessionConfirm && (
        <ConfirmModal
          visible={endSessionConfirm}
          onCancel={toggleEndSessionConfirm}
          onConfirm={confirmSessionEnd}
          title="Are you sure you want to end ongoing session?"
        />
      )}
    </>
  );
};

export default Batsman;
