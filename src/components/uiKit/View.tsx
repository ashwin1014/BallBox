import {useMemo} from 'react';

import {
  View as RNView,
  SafeAreaView,
  ViewProps as RNViewProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

// import theme from 'src/theme';
import commonStyles from 'src/theme/commonStyles';

import DelayedRender from './DelayedRender';

interface ViewProps extends RNViewProps {
  safeArea?: boolean;
  renderDelay?: number;
  style?: StyleProp<ViewStyle>;
  flex?: boolean;
  row?: boolean;
  spread?: boolean;
  center?: boolean;
  jcStart?: boolean;
  jcEnd?: boolean;
  aiStart?: boolean;
  aiEnd?: boolean;
  aiCenter?: boolean;
  jcCenter?: boolean;
  wrap?: boolean;
  halfWidth?: boolean;
  fullWidth?: boolean;
  paddingH?: number | string;
  paddingV?: number | string;
  marginH?: number | string;
  marginV?: number | string;
  //   backgroundColor?:
  //     | 'primary'
  //     | 'secondary'
  //     | 'tertiary'
  //     | 'quaternary'
  //     | 'component'
  //     | 'item';
}

/**
 * @description: An enhanced View component
 * @extends: View
 * @param {boolean} safeArea - whether to render a SafeAreaView
 * @param {number} renderDelay -  Pass time in ms to delay render
 * @param {StyleProp<ViewStyle>} style - style prop
 * @param {boolean} row - whether to render as a row
 * @param {boolean} spread - spread content (similar to space-between)
 * @param {boolean} center - center content
 * @param {boolean} jcStart - justify content start
 * @param {boolean} jcEnd - justify content end
 * @param {boolean} aiStart - align items start
 * @param {boolean} aiEnd - align items end
 * @param {boolean} aiCenter - align items center
 * @param {boolean} jcCenter - justify content center
 * @param {number} paddingH - padding Horizontal
 * @param {number} paddingV - padding Vertical
 * @param {number} marginH - margin Horizontal
 * @param {number} marginV - margin Vertical
 * @param {number} flex - flex: 1
 * @param {boolean} wrap - flexWrap: wrap
 * @param {boolean} fullWidth - width: 100%
 * @param {boolean} halfWidth - width: 50%
 */
const View = ({
  children,
  safeArea,
  renderDelay,
  style,
  row,
  spread,
  center,
  aiEnd,
  aiStart,
  jcStart,
  jcEnd,
  aiCenter,
  jcCenter,
  paddingH,
  paddingV,
  marginH,
  marginV,
  flex,
  wrap,
  fullWidth,
  halfWidth,
  //   backgroundColor,
  ...rest
}: ViewProps) => {
  const Element = safeArea ? SafeAreaView : RNView;

  const viewStyle = useMemo(
    () => [
      style,
      row && commonStyles.flexRow,
      spread && commonStyles.spread,
      center && commonStyles.center,
      aiEnd && commonStyles.aiEnd,
      aiStart && commonStyles.aiStart,
      jcStart && commonStyles.jcStart,
      jcEnd && commonStyles.jcEnd,
      aiCenter && commonStyles.aiCenter,
      jcCenter && commonStyles.jcCenter,
      paddingH && {paddingHorizontal: paddingH},
      paddingV && {paddingVertical: paddingV},
      marginH && {marginHorizontal: marginH},
      marginV && {marginVertical: marginV},
      //   backgroundColor === 'primary' && styles.primaryBg,
      //   backgroundColor === 'secondary' && styles.secondaryBg,
      //   backgroundColor === 'tertiary' && styles.tertiaryBg,
      //   backgroundColor === 'quaternary' && styles.quaternaryBg,
      //   backgroundColor === 'component' && styles.componentBg,
      //   backgroundColor === 'item' && styles.itemBg,
      flex && styles.flex,
      wrap && styles.wrap,
      halfWidth && styles.halfWidth,
      fullWidth && styles.fullWidth,
    ],
    [
      style,
      row,
      spread,
      center,
      aiEnd,
      aiStart,
      jcStart,
      jcEnd,
      aiCenter,
      jcCenter,
      paddingH,
      paddingV,
      marginV,
      marginH,
      flex,
      wrap,
      //   backgroundColor,
      fullWidth,
      halfWidth,
    ],
  ) as StyleProp<ViewStyle>;

  if (renderDelay) {
    return (
      <DelayedRender delay={renderDelay}>
        <Element {...rest} style={viewStyle}>
          {children}
        </Element>
      </DelayedRender>
    );
  }

  return (
    <Element {...rest} style={viewStyle}>
      {children}
    </Element>
  );
};

export default View;

const styles = StyleSheet.create({
  //   primaryBg: {
  //     backgroundColor: theme.color.primaryBackground,
  //   },
  //   secondaryBg: {
  //     backgroundColor: theme.color.secondaryBackground,
  //   },
  //   tertiaryBg: {
  //     backgroundColor: theme.color.tertiaryBackgroundColor,
  //   },
  //   quaternaryBg: {
  //     backgroundColor: theme.color.quaternaryBackgroundColor,
  //   },
  //   componentBg: {
  //     backgroundColor: theme.color.componentSecondaryColor,
  //   },
  //   itemBg: {
  //     backgroundColor: theme.color.itemBackground,
  //   },
  flex: {
    flex: 1,
  },
  wrap: {
    flexWrap: 'wrap',
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '50%',
  },
});
