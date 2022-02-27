import {useEffect} from 'react';

import {StyleSheet, View} from 'react-native';

import {Button, Card, Modal, Text} from '@ui-kitten/components';

import {commonStyles} from 'src/theme';

interface ConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  onModalClose?: () => void;
  title: string;
}

const ConfirmModal = ({
  visible,
  title,
  onCancel,
  onConfirm,
  onModalClose,
}: ConfirmModalProps) => {
  useEffect(() => {
    return () => {
      onModalClose?.();
    };
  }, [onModalClose]);

  return (
    <Modal visible={visible} backdropStyle={commonStyles.backdrop}>
      <Card disabled>
        <Text>{title}</Text>
        <View style={styles.confirmModalFooter}>
          <Button
            size="small"
            onPress={onCancel}
            style={styles.cancelModalButton}
            appearance="outline">
            Cancel
          </Button>
          <Button
            size="small"
            onPress={onConfirm}
            style={styles.confirmModalButton}>
            Confirm
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  confirmModalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  confirmModalButton: {
    flexGrow: 1,
    marginLeft: 5,
  },
  cancelModalButton: {
    flexGrow: 1,
    marginRight: 5,
  },
});
