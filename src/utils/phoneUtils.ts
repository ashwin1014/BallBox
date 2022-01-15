import {Platform, PixelRatio, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const isPortrait = () => {
  return SCREEN_HEIGHT >= SCREEN_WIDTH;
};

const isLandscape = () => {
  return SCREEN_WIDTH >= SCREEN_HEIGHT;
};

/**
 * @summary Checks if hermes engine is enabled
 */
// @ts-ignore
const isHermesEnabled = () => !!(global as any).HermesInternal;

/**
 * @summary Checks if Platform is IOS
 */
const isIOS = Platform.OS === 'ios';

/**
 * @summary Checks if Platform is Android
 */
const isAndroid = Platform.OS === 'android';

/**
 * @summary
 * Responsive font Sizes
 *
 * @example
 * ```typescript
 * import {View, StyleSheet} from 'react-native';
 * import {normalizeFontSize} from 'src/utils'
 *
 * const styles = StyleSheet.create({
 *   font: {
 *     fontSize: normalize(12),
 *   },
 * })
 *
 * ```
 */
const normalizeFontSize = (size: number): number => {
  const scaleFactor = 320; // based on standard ~5" screen mobile
  const scale = SCREEN_WIDTH / scaleFactor;
  const newSize = size * scale;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export {
  isPortrait,
  isLandscape,
  isHermesEnabled,
  isAndroid,
  isIOS,
  normalizeFontSize,
};
