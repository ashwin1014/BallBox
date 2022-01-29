import {
  useContext,
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';

import {IndexPath} from '@ui-kitten/components';
// import {format, parseISO} from 'date-fns/fp';
import {Immutable} from 'immer';

import {useAuthentication} from 'src/context';
import {Player} from 'src/types';

// import {userProfile} from './mock';

type PlayerSelect = IndexPath | undefined;

interface SessionContextValue {
  players: Immutable<Player[]> | undefined;
  selectedBatsmen: Immutable<Player> | undefined;
  selectedBowler: Immutable<Player> | undefined;
  setSelectedBatsmenIndex: Dispatch<SetStateAction<PlayerSelect>>;
  setSelectedBowlerIndex: Dispatch<SetStateAction<PlayerSelect>>;
  selectedBatsmenIndex: PlayerSelect;
  selectedBowlerIndex: PlayerSelect;
  handleSessionReset: () => void;
  handleStartTime: () => void;
  handleEndTime: () => void;
  sessionTime: {start: string; end: string};
}

function createCtx<A extends {} | null>() {
  const SessionContext = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(SessionContext);
    if (c === undefined) {
      throw new Error('useCtx must be inside a Provider with a value');
    }
    return c;
  }
  return [useCtx, SessionContext.Provider] as const;
}

const [useSession, SessionProvider] = createCtx<SessionContextValue>();

const SessionDataProvider = ({children}: {children: ReactNode}) => {
  const {profile} = useAuthentication();
  const [selectedBatsmenIndex, setSelectedBatsmenIndex] =
    useState<PlayerSelect>();
  const [selectedBowlerIndex, setSelectedBowlerIndex] =
    useState<PlayerSelect>();

  const [sessionTime, setSessionTime] = useState({
    start: '',
    end: '',
  });

  const players = profile?.players;

  const selectedBatsmen =
    selectedBatsmenIndex && players?.[selectedBatsmenIndex.row];
  const selectedBowler =
    selectedBowlerIndex && players?.[selectedBowlerIndex.row];

  const handleSessionReset = () => {
    setSelectedBatsmenIndex(undefined);
    setSelectedBowlerIndex(undefined);
    setSessionTime({start: '', end: ''});
  };

  const handleStartTime = () => {
    const now = new Date().toISOString();
    setSessionTime(prev => ({...prev, start: now}));
  };

  const handleEndTime = () => {
    const now = new Date().toISOString();
    setSessionTime(prev => ({...prev, start: now}));
  };

  const value = {
    players,
    selectedBatsmenIndex,
    selectedBowlerIndex,
    setSelectedBatsmenIndex,
    setSelectedBowlerIndex,
    selectedBatsmen,
    selectedBowler,
    handleSessionReset,
    sessionTime,
    handleStartTime,
    handleEndTime,
  } as const;

  return <SessionProvider value={value}>{children}</SessionProvider>;
};

export {SessionDataProvider, useSession};
