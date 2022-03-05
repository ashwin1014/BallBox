import {forwardRef, ReactNode, useCallback, useMemo} from 'react';

import {StyleSheet, StyleProp, TextStyle, Dimensions} from 'react-native';

import RnBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Text, Button} from '@ui-kitten/components';

import {CloseOutline} from 'src/assets';
import {View} from 'src/components';
import {theme} from 'src/theme';
import {noop} from 'src/utils';

interface BottomSheetProps {
  children: ReactNode;
  snapPoints?: Array<number | string>;
  handleSheetClose: () => void;
  onSheetChange?: ((index: number) => void) | undefined;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

const BottomSheet = forwardRef<RnBottomSheet, BottomSheetProps>(
  (
    {
      // snapPoints,
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
          // disappearsOnIndex={-1}
          // appearsOnIndex={1}
        />
      ),
      [],
    );
    const {height} = Dimensions.get('window');
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    return (
      <RnBottomSheet
        ref={ref}
        index={-1}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        animateOnMount
        // onClose={onClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.backgroundStyle}
        // handleIndicatorStyle={styles.handleIndicator}
        enablePanDownToClose
        onChange={onSheetChange}
        {...rest}>
        <BottomSheetScrollView
          onLayout={handleContentLayout}
          style={{maxHeight: height * 0.9}}>
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
        </BottomSheetScrollView>
      </RnBottomSheet>
    );
  },
);

export default BottomSheet;

BottomSheet.defaultProps = {
  onSheetChange: noop,
  title: '',
  children: null,
};

const styles = StyleSheet.create({
  bottomSheetContentContainer: {
    alignItems: 'center',
  },
  backgroundStyle: {
    backgroundColor: 'pink',
    height: '100%',
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
    flex: 1,
  },
  close: {
    marginLeft: 'auto',
    height: 20,
    width: 20,
  },
});
