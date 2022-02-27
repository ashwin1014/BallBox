import {StyleSheet} from 'react-native';

import {theme} from 'src/theme';

const styles = StyleSheet.create({
  tabContainer: {
    height: theme.sizes.deviceHeight - 200,
    backgroundColor: theme.colors.background,
    padding: 10,
  },
  header: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 10,
    color: theme.colors.text,
  },
  separator: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputsContainer: {
    marginTop: 20,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#41A5C0',
    width: 140,
    marginBottom: 8,
  },
  radio: {
    margin: 2,
  },
  sheetTitle: {
    textTransform: 'capitalize',
  },
  card: {
    margin: 2,
  },
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

export default styles;
