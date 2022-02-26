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
// import {db} from 'src/firebase';
import {Player, Roles} from 'src/types';

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
  handleSessionReset: (type: Roles) => void;
  handleStartTime: (type: Roles) => void;
  handleEndTime: (type: Roles) => void;
  bowlerSessionTime: {start: string; end: string};
  batsmanSessionTime: {start: string; end: string};
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

  const [bowlerSessionTime, setBowlerSessionTime] = useState({
    start: '',
    end: '',
  });

  const [batsmanSessionTime, setBatsmanSessionTime] = useState({
    start: '',
    end: '',
  });

  const players = profile?.players;

  const selectedBatsmen =
    selectedBatsmenIndex && players?.[selectedBatsmenIndex.row];
  const selectedBowler =
    selectedBowlerIndex && players?.[selectedBowlerIndex.row];

  const handleSessionReset = (type: Roles) => {
    if (type === Roles.BATSMAN) {
      setSelectedBatsmenIndex(undefined);
      setBatsmanSessionTime({start: '', end: ''});
      return;
    }
    setSelectedBowlerIndex(undefined);
    setBowlerSessionTime({start: '', end: ''});
  };

  const handleStartTime = (type: Roles) => {
    const now = new Date().toISOString();
    if (type === Roles.BATSMAN) {
      setBatsmanSessionTime(prev => ({...prev, start: now}));
      return;
    }
    setBowlerSessionTime(prev => ({...prev, start: now}));
  };

  const handleEndTime = (type: Roles) => {
    const now = new Date().toISOString();
    if (type === Roles.BATSMAN) {
      setBatsmanSessionTime(prev => ({...prev, end: now}));
      return;
    }
    setBowlerSessionTime(prev => ({...prev, end: now}));
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
    batsmanSessionTime,
    bowlerSessionTime,
    handleStartTime,
    handleEndTime,
  } as const;

  return <SessionProvider value={value}>{children}</SessionProvider>;
};

export {SessionDataProvider, useSession};
