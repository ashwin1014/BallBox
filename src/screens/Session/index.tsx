import {SessionDataProvider} from 'src/context';

import Session from './Session';

const SessionContainer = () => {
  return (
    <SessionDataProvider>
      <Session />
    </SessionDataProvider>
  );
};

export default SessionContainer;
