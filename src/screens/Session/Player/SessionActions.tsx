import {Button} from '@ui-kitten/components';

import {View} from 'src/components';
import {commonStyles} from 'src/theme';

interface SessionActionsProps {
  disableNextBall?: boolean;
  disableEndSession?: boolean;
  onCancelSession: () => void;
  handleNextBall: () => void;
  handleSessionEnd: () => void;
}

const SessionActions = ({
  onCancelSession,
  handleNextBall,
  handleSessionEnd,
  disableNextBall,
  disableEndSession,
}: SessionActionsProps) => {
  return (
    <View row spread paddingH={8} style={commonStyles.mtAuto}>
      <Button status="danger" size="small" onPress={onCancelSession}>
        Cancel Session
      </Button>
      <Button
        size="medium"
        onPress={handleSessionEnd}
        disabled={disableEndSession}>
        End Session
      </Button>
      <Button
        status="info"
        size="small"
        onPress={handleNextBall}
        disabled={disableNextBall}>
        Next Ball
      </Button>
    </View>
  );
};

export default SessionActions;
