import {StyleSheet} from 'react-native';

import {Modal, Spinner} from '@ui-kitten/components';

interface OverlaySpinnerProps {
  loading: boolean;
}

const OverlaySpinner = ({loading}: OverlaySpinnerProps) => {
  if (!loading) {
    return null;
  }

  return (
    <Modal visible={loading} backdropStyle={styles.backdrop}>
      <Spinner />
    </Modal>
  );
};

export default OverlaySpinner;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
