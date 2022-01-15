import {ReactElement} from 'react';

import {ImageProps} from 'react-native';

import {Icon} from '@ui-kitten/components';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

const HeartIcon = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="heart" />
);

export {HeartIcon};
