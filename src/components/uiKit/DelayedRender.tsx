import {useState, ReactNode, memo} from 'react';

import {useTimeout} from 'src/hooks';

type Props = {
  children: ReactNode;
  delay?: number;
};

/**
 * @summary
 * Component that delays the render of an element
 *
 * @example
 * ```typescript
 *    <DelayedRender delay={500}>
 *      <Text>Will show after 500ms</Text>
 *    </DelayedRender>
 * ```
 */

const DelayedRender = ({children, delay = 200}: Props) => {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);

  useTimeout(show, delay);

  return isShown ? <>{children}</> : null;
};

export default memo(DelayedRender);
