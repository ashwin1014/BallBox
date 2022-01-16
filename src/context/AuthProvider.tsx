import {useContext, createContext, ReactNode} from 'react';

import {useToggle} from 'src/hooks';

interface AuthContextValue {
  isAuthenticated: boolean;
  toggleAuthState: () => void;
  isGuestUser: boolean;
  toggleGuestUserState: () => void;
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

  const value = {
    isAuthenticated,
    toggleAuthState,
    isGuestUser,
    toggleGuestUserState,
  } as const;

  return (
    <AuthenticationProvider value={value}>{children}</AuthenticationProvider>
  );
};

export {AuthProvider, useAuthentication};
