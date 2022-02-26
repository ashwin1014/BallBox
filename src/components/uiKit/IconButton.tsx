import React, {ReactElement} from 'react';

import {ImageProps, StyleProp, ViewProps} from 'react-native';

import {Button} from '@ui-kitten/components';

interface IconButtonProps {
  icon: ReactElement<ImageProps>;
  style?: StyleProp<ViewProps>;
  onPress: () => void;
}

const IconButton = ({icon, style, onPress}: IconButtonProps) => {
  return (
    <Button
      appearance="ghost"
      accessoryLeft={icon}
      style={style}
      onPress={onPress}
    />
  );
};

export default IconButton;
