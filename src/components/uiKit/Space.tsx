import {memo, ReactNode} from 'react';

import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  jcCenter: {
    justifyContent: 'center',
  },
  aiCenter: {
    alignItems: 'center',
  },
  wrap: {
    flexWrap: 'wrap',
  },
});

const toElementsArray = (list: ReactNode) => {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
};

const getSpacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

interface SpaceProps {
  direction?: 'horizontal' | 'vertical';
  children: ReactNode;
  size?: keyof typeof getSpacing;
  wrapperStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  jcCenter?: boolean;
  aiCenter?: boolean;
  wrap?: boolean;
}

/**
 * @summary
 * Component sets spacing between child components
 *
 * @remarks
 * Spacing can be "vertical" or "horizontal"
 *
 * @example
 * ```typescript
 *    <Space direction="vertical" size="md">
 *      <View>Component 1</View>
 *      <View>Component 2</View>
 *    </Space>
 * ```
 */
const Space = memo(
  ({
    direction = 'horizontal',
    size = 'sm',
    wrapperStyle = {},
    itemStyle = {},
    jcCenter,
    aiCenter,
    wrap,
    children,
  }: SpaceProps) => {
    const childNodes = toElementsArray(children);
    const itemsLength = childNodes.length;
    const marginDirection =
      direction === 'horizontal' ? 'marginRight' : 'marginBottom';

    if (itemsLength === 0) {
      return null;
    }
    return (
      <View
        style={[
          direction === 'horizontal' && styles.flexRow,
          direction === 'vertical' && styles.flexCol,
          aiCenter && styles.aiCenter,
          jcCenter && styles.jcCenter,
          wrap && styles.wrap,
          wrapperStyle,
        ]}>
        {(childNodes || []).map((child, i) =>
          !child ? null : (
            <View
              key={i}
              style={[
                childNodes.lastIndexOf(child) === itemsLength - 1
                  ? // eslint-disable-next-line react-native/no-inline-styles
                    {[marginDirection]: 0}
                  : {[marginDirection]: getSpacing[size]},
                styles.item,
                itemStyle,
              ]}>
              {child}
            </View>
          ),
        )}
      </View>
    );
  },
);

export default Space;
