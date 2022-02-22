import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {Immutable} from 'immer';
import {useImmer} from 'use-immer';

import {auth, FirebaseAuthTypes} from 'src/firebase';
import {useToggle} from 'src/hooks';
import {UserProfile, Coach, Player} from 'src/types';

import {userProfile} from './mock';

interface AuthContextValue {
  isAuthenticated: boolean;
  toggleAuthState: () => void;
  isGuestUser: boolean;
  loading: boolean;
  toggleGuestUserState: () => void;
  handleSignOut: () => Promise<void>;
  phoneLogin: (phoneNumber: string) => Promise<void>;
  confirmOtpLogin: (otp: string) => Promise<void>;
  profile: Immutable<UserProfile | null>;
  addCoach: (data: Coach) => void;
  addPlayer: (data: Player) => void;
  confirmSms: FirebaseAuthTypes.ConfirmationResult | null;
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
  const [confirmSms, setConfirmSms] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [profile, setProfile] =
    useImmer<Immutable<UserProfile | null>>(userProfile);

  const phoneLogin = useCallback(
    async (phoneNumber: string) => {
      toggleLoading();
      try {
        const confirmation = await auth.signInWithPhoneNumber(
          `+91${phoneNumber}`,
        );
        setConfirmSms(confirmation);
      } catch (e) {
        console.error(e);
      } finally {
        toggleLoading();
      }
    },
    [toggleLoading],
  );

  const confirmOtpLogin = useCallback(
    async (otp: string) => {
      toggleLoading();
      try {
        await confirmSms?.confirm(otp);
      } catch {
        console.log('Invalid code.');
      } finally {
        toggleLoading();
      }
    },
    [confirmSms, toggleLoading],
  );

  const handleAnonymousLogin = useCallback(async () => {
    toggleLoading();
    try {
      await auth.signInAnonymously();
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

  const handleSignOut = useCallback(async () => {
    toggleLoading();
    try {
      await auth.signOut();
      toggleAuthState();
      toggleGuestUserState();
      setProfile(null);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }, [setProfile, toggleAuthState, toggleGuestUserState, toggleLoading]);

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

  const handleOnAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      console.log({user: user});
      if (user?.isAnonymous) {
        // toggleGuestUserState();
        console.log('Guest user');
      }
    },
    [],
  );

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(userState => {
      handleOnAuthStateChanged(userState);
    });

    return subscriber;
  }, [handleOnAuthStateChanged]);

  const value = {
    isAuthenticated,
    toggleAuthState,
    isGuestUser,
    toggleGuestUserState: handleAnonymousLogin,
    profile,
    addCoach,
    addPlayer,
    loading,
    handleSignOut,
    phoneLogin,
    confirmOtpLogin,
    confirmSms,
  } as const;

  return (
    <AuthenticationProvider value={value}>{children}</AuthenticationProvider>
  );
};

export {AuthProvider, useAuthentication};
