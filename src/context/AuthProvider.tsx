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
  userId: string | undefined;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuestUser, setIsGuestUser] = useState(false);
  const [loading, toggleLoading] = useToggle(false);
  const [confirmSms, setConfirmSms] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [profile, setProfile] =
    useImmer<Immutable<UserProfile | null>>(userProfile);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const toggleAuthState = useCallback(
    () => setIsAuthenticated(prevState => !prevState),
    [],
  );

  // const toggleGuestUserState = useCallback(
  //   () => setIsGuestUser(prevState => !prevState),
  //   [],
  // );

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
            text1: 'OTP Send Error',
            text2: e.message,
          });
        }
      } finally {
        toggleLoading();
      }
    },
    [toggleLoading],
  );

  const handleAddNewUser = async (
    uid: string | undefined,
    phoneNumber: string | null | undefined,
  ) => {
    if (!uid || !phoneNumber) {
      return;
    }

    const userObj = {
      userId: uid,
      name: '',
      email: '',
      phone: phoneNumber,
      academy: '',
      photo: '',
      coaches: [],
      players: [],
    };

    try {
      await db.collection('users').doc(uid).set(userObj);
      // await db.collection('users').doc('preferences').set(userObj);
      Toast.show({
        type: 'info',
        text1: 'Welcome on board!',
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error('handleAddNewUser', e.message);
        Toast.show({
          type: 'error',
          text1: 'Error creating user',
          text2: e.message,
        });
      }
    }
  };

  const confirmOtpLogin = useCallback(
    async (otp: string) => {
      toggleLoading();
      try {
        const userDetails = await confirmSms?.confirm(otp);
        const isNewUser = userDetails?.additionalUserInfo?.isNewUser;
        const isAnonymous = userDetails?.user.isAnonymous;
        const uid = userDetails?.user.uid;
        const phoneNumber = userDetails?.user.phoneNumber;
        setUserId(uid);
        // console.log({userDetails});
        // console.log({isNewUser});
        if (isNewUser && !isAnonymous) {
          await handleAddNewUser(uid, phoneNumber);
        } else {
          Toast.show({
            type: 'info',
            text1: 'Welcome back!',
          });
        }
        // toggleAuthState();
        // toggleGuestUserState();
      } catch (e) {
        if (e instanceof Error) {
          console.error('confirmOtpLogin', e.message);
          Toast.show({
            type: 'error',
            text1: 'OTP Error',
            text2: e.message,
          });
        }
      } finally {
        toggleLoading();
        setConfirmSms(null);
      }
    },
    [confirmSms, toggleLoading],
  );

  const handleAnonymousLogin = useCallback(async () => {
    toggleLoading();
    try {
      await auth.signInAnonymously();
      // toggleGuestUserState();
      Toast.show({
        type: 'info',
        text2: 'Welcome guest user!',
      });
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
  }, [toggleLoading]);

  const handleSignOut = useCallback(async () => {
    toggleLoading();
    try {
      await auth.signOut();
      // toggleAuthState();
      // toggleGuestUserState();
      setProfile(null);
      setUserId(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }, [setProfile, toggleLoading]);

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
      // console.log('user', user);
      if (user) {
        setUserId(user.uid);
        setIsGuestUser(true);
        if (!user.isAnonymous) {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
        setIsGuestUser(false);
        setUserId(undefined);
      }
    },
    [],
  );

  // console.log('currentUser', auth.currentUser);
  // console.log('userId', userId);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && userId) {
        try {
          const doc = await db.collection('users').doc(userId).get();
          const userProfile = doc.data();
          console.log('userProfile', userProfile);
          setProfile(userProfile as UserProfile);
        } catch (e) {
          if (e instanceof Error) {
            console.error('fetchUserProfile', e.message);
            Toast.show({
              type: 'error',
              text1: 'Error fetching user profile',
              text2: e.message,
            });
          }
        }
      }
    };
    fetchUserProfile();
  }, [setProfile, userId, isAuthenticated]);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(userState => {
      handleOnAuthStateChanged(userState);
    });

    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    userId,
  } as const;

  return (
    <AuthenticationProvider value={value}>{children}</AuthenticationProvider>
  );
};

export {AuthProvider, useAuthentication};
