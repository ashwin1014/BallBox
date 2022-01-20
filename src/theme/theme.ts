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
};

const colors = {
  background: palette.p1,
  text: palette.p5,
  link: palette.p3,
  error: palette.p9,
  primary: palette.p3,
  border: palette.p10,
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

const theme = {colors, sizes, palette};

export default theme;
