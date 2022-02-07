import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const palette = {
  p1: '#FEFBF3',
  p2: '#F8F0DF',
  p3: '#79B4B7',
  p4: '#9D9D9D',
  p5: '#363636',
  p7: '##f3f0ee',
  p8: '#FFF',
  p9: '#9D5353',
  p10: '#00000030',
  p11: '#59b5b7',
  p12: '#c8f4f9',
  p13: '#B43B42',
  p14: '#F09CA2',
  p15: '#6AABD2',
  p16: '#2E8BC0',
  p17: '#B7CFDC',
};

//https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-light-theme
const evaThemes = {
  'color-primary-default': palette.p3,
  'color-primary-active': palette.p10,
  'color-primary-disabled': palette.p12,
  'text-basic-color': palette.p5,
  'color-danger-default': palette.p9,
  'color-danger-active': palette.p13,
  'color-danger-disabled': palette.p14,
  'color-info-default': palette.p15,
  'color-info-active': palette.p16,
  'color-info-disabled': palette.p17,
};

const colors = {
  background: palette.p1,
  text: palette.p5,
  link: palette.p3,
  error: palette.p9,
  primary: palette.p3,
  border: palette.p10,
  info: palette.p15,
};

const sizes = {
  deviceWidth: width,
  deviceHeight: height,
  xxs: 4,
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 18,
};

const theme = {colors, sizes, palette, evaThemes};

export default theme;
