import {ReactNode} from 'react';

import {View, StyleSheet, ViewStyle} from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface CenterProps {
  children: ReactNode;
  style?: ViewStyle;
}

/**
 * @summary
 * Align all children to center
 *
 * @example
 * ```typescript
 *    <Center>
 *      <View>Component</View>
 *    </Center>
 * ```
 */
const Center = ({style = {}, children}: CenterProps) => (
  <View style={{...styles.center, ...style}}>{children}</View>
);

export default Center;
