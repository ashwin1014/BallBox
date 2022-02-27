import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  jcCenter: {
    justifyContent: 'center',
  },
  jcStart: {
    justifyContent: 'flex-start',
  },
  jcEnd: {
    justifyContent: 'flex-end',
  },
  spread: {
    justifyContent: 'space-between',
  },
  aiCenter: {
    alignItems: 'center',
  },
  aiStart: {
    alignItems: 'flex-start',
  },
  aiEnd: {
    alignItems: 'flex-end',
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColumnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  fullWidth: {
    width: '100%',
  },
  wdAuto: {
    width: 'auto',
  },
  halfWidth: {
    width: '50%',
  },
  mT0: {
    marginTop: 0,
  },
  mB0: {
    marginBottom: 0,
  },
  flex1: {
    flex: 1,
  },
  mhAuto: {
    marginHorizontal: 'auto',
  },
  mvAuto: {
    marginVertical: 'auto',
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mtAuto: {
    marginTop: 'auto',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  flexGrow1: {
    flexGrow: 1,
  },
});

export default styles;
