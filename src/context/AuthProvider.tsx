import {useContext, createContext, ReactNode, useCallback} from 'react';

import {Immutable} from 'immer';
import {useImmer} from 'use-immer';

import {auth} from 'src/firebase';
import {useToggle} from 'src/hooks';
import {UserProfile, Coach, Player} from 'src/types';

import {userProfile} from './mock';

interface AuthContextValue {
  isAuthenticated: boolean;
  toggleAuthState: () => void;
  isGuestUser: boolean;
  loading: boolean;
  toggleGuestUserState: () => void;
  profile: Immutable<UserProfile>;
  addCoach: (data: Coach) => void;
  addPlayer: (data: Player) => void;
}

function createCtx<A extends {} | null>() {
  const AuthContext = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(AuthContext);
    if (c === undefined) {
      throw new Error('useCtx must be inside a Provider with a value');
    }
    return c;
  }
  return [useCtx, AuthContext.Provider] as const;
}

const [useAuthentication, AuthenticationProvider] =
  createCtx<AuthContextValue>();

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAuthenticated, toggleAuthState] = useToggle(false);
  const [isGuestUser, toggleGuestUserState] = useToggle(false);
  const [loading, toggleLoading] = useToggle(false);
  const [profile, setProfile] = useImmer<Immutable<UserProfile>>(userProfile);

  const handleAnonymousLogin = useCallback(async () => {
    toggleLoading();
    try {
      await auth().signInAnonymously();
      toggleGuestUserState();
    } catch (error) {
      if ((error as any).code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
    } finally {
      toggleLoading();
    }
  }, [toggleGuestUserState, toggleLoading]);

  const addCoach = useCallback(
    data => {
      setProfile(draft => {
        draft?.coaches?.push({
          id: 'c_' + Math.random(),
          name: data.name,
          number: data.number,
          photo: data.imgUrl,
          academy: data.academy,
        });
      });
    },
    [setProfile],
  );

  const addPlayer = useCallback(
    data => {
      setProfile(draft => {
        draft?.players?.push({
          id: 'p_' + Math.random(),
          name: data.name,
          number: data.number,
          photo: data.imgUrl,
          role: data.role,
          specialty: data.specialty,
          style: data.style,
          order: data.order,
        });
      });
    },
    [setProfile],
  );

  const value = {
    isAuthenticated,
    toggleAuthState,
    isGuestUser,
    toggleGuestUserState: handleAnonymousLogin,
    profile,
    addCoach,
    addPlayer,
    loading,
  } as const;

  return (
    <AuthenticationProvider value={value}>{children}</AuthenticationProvider>
  );
};

export {AuthProvider, useAuthentication};
