import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {Immutable} from 'immer';
import Toast from 'react-native-toast-message';
import {useImmer} from 'use-immer';

import {auth, FirebaseAuthTypes, db} from 'src/firebase';
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
        Toast.show({
          type: 'success',
          text2: `OTP sent successfully to +91${phoneNumber}`,
        });
        setConfirmSms(confirmation);
      } catch (e) {
        if (e instanceof Error) {
          console.error('phoneLogin', e.message);
          Toast.show({
            type: 'error',
            text2: e.message,
          });
        }
      } finally {
        toggleLoading();
      }
    },
    [toggleLoading],
  );

  const handleAddNewUser = async (uid: string | undefined) => {
    if (!uid) {
      return;
    }

    const userObj = {
      userId: uid,
      name: '',
      email: '',
      phone: '',
      academy: '',
      photo: '',
      coaches: [],
      players: [],
    };

    try {
      await db.collection('users').doc(uid).set(userObj);
      // await db.collection('users').doc('preferences').set(userObj);
    } catch {}
  };

  const confirmOtpLogin = useCallback(
    async (otp: string) => {
      toggleLoading();
      try {
        const userDetails = await confirmSms?.confirm(otp);
        const isNewUser = userDetails?.additionalUserInfo?.isNewUser;
        const uid = userDetails?.user.uid;
        console.log({userDetails});
        console.log({isNewUser});
        if (isNewUser) {
          await handleAddNewUser(uid);
        }
        toggleAuthState();
        toggleGuestUserState();
      } catch (e) {
        if (e instanceof Error) {
          console.error('confirmOtpLogin', e.message);
          Toast.show({
            type: 'error',
            text2: e.message,
          });
        }
      } finally {
        toggleLoading();
        setConfirmSms(null);
      }
    },
    [confirmSms, toggleAuthState, toggleGuestUserState, toggleLoading],
  );

  const handleAnonymousLogin = useCallback(async () => {
    toggleLoading();
    try {
      await auth.signInAnonymously();
      toggleGuestUserState();
    } catch (error) {
      if (error instanceof Error) {
        console.error('handleAnonymousLogin', error.message);
        Toast.show({
          type: 'error',
          text2: error.message,
        });
      }
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
