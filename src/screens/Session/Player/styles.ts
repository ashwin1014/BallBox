import {StyleSheet} from 'react-native';

import {theme} from 'src/theme';

const styles = StyleSheet.create({
  tabContainer: {
    height: theme.sizes.deviceHeight - 250,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
});

export default styles;
