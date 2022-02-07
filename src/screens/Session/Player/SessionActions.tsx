import {Button} from '@ui-kitten/components';

import {View} from 'src/components';
import {commonStyles} from 'src/theme';

interface SessionActionsProps {
  disableNextBall?: boolean;
  onCancelSession: () => void;
  handleNextBall: () => void;
}

const SessionActions = ({
  onCancelSession,
  handleNextBall,
  disableNextBall,
}: SessionActionsProps) => {
  return (
    <View row spread paddingH={8} style={commonStyles.mtAuto}>
      <Button status="danger" size="small" onPress={onCancelSession}>
        Cancel Session
      </Button>
      <Button size="medium">End Session</Button>
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
