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

const BackIcon = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="arrow-back" />
);

const ArrowForward = (
  props?: Partial<ImageProps>,
): ReactElement<ImageProps> => <Icon {...props} name="arrow-forward-outline" />;

const AlertTriangle = (
  props?: Partial<ImageProps>,
): ReactElement<ImageProps> => (
  <Icon {...props} name="alert-triangle-outline" />
);

const Activity = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="activity-outline" />
);

const Home = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="home-outline" />
);

const People = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="people-outline" />
);

const Person = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="person-outline" />
);

const Recording = (props?: Partial<ImageProps>): ReactElement<ImageProps> => (
  <Icon {...props} name="recording-outline" />
);

const MoreVertical = (
  props?: Partial<ImageProps>,
): ReactElement<ImageProps> => <Icon {...props} name="more-vertical" />;

const CloseOutline = (
  props?: Partial<ImageProps>,
): ReactElement<ImageProps> => <Icon {...props} name="close-outline" />;

export {
  HeartIcon,
  BackIcon,
  ArrowForward,
  AlertTriangle,
  Activity,
  Home,
  People,
  Person,
  Recording,
  MoreVertical,
  CloseOutline,
};
