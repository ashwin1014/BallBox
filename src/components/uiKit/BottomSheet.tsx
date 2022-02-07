import {forwardRef, ReactNode, useCallback} from 'react';

import {StyleSheet, StyleProp, TextStyle} from 'react-native';

import RnBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {Text, Button} from '@ui-kitten/components';

import {CloseOutline} from 'src/assets';
import {View} from 'src/components';
import {theme} from 'src/theme';
import {noop} from 'src/utils';

interface BottomSheetProps {
  children: ReactNode;
  snapPoints: Array<number | string>;
  handleSheetClose: () => void;
  onSheetChange?: ((index: number) => void) | undefined;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

const BottomSheet = forwardRef<RnBottomSheet, BottomSheetProps>(
  (
    {
      snapPoints,
      handleSheetClose,
      onSheetChange,
      children,
      title,
      titleStyle,
      ...rest
    }: BottomSheetProps,
    ref,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      ),
      [],
    );

    return (
      <RnBottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableHandlePanningGesture
        onChange={onSheetChange}
        backdropComponent={renderBackdrop}
        {...rest}>
        <View style={styles.bottomSheetContentContainer}>
          <View row style={styles.header}>
            <Text category="h5" style={[styles.title, titleStyle]}>
              {title}
            </Text>
            <Button
              style={styles.close}
              appearance="ghost"
              status="danger"
              onPress={handleSheetClose}
              accessoryLeft={<CloseOutline />}
            />
          </View>
          <View style={styles.body}>{children}</View>
        </View>
      </RnBottomSheet>
    );
  },
);

export default BottomSheet;

BottomSheet.defaultProps = {
  snapPoints: ['2%', '40%'],
  onSheetChange: noop,
  title: '',
  children: null,
};

const styles = StyleSheet.create({
  bottomSheetContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    padding: 10,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginLeft: 'auto',
    left: 20,
  },
  body: {
    padding: 10,
    width: '100%',
  },
  close: {
    marginLeft: 'auto',
    height: 20,
    width: 20,
  },
});
