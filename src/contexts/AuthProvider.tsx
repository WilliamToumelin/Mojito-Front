import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  signIn: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Ici, on pourra ajouter la logique de connexion (appeler l'API, etc.)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Ici, on pourra ajouter la logique de déconnexion (appeler l'API, etc.)
    setIsLoggedIn(false);
  };

  const signIn = () => {
    // Ici, on pourra ajouter la logique de création de compte (appeler l'API, etc.)
  };

  const logMemo = useMemo(
    () => ({ isLoggedIn, login, logout, signIn }),
    [isLoggedIn]
  );

  return (
    <AuthContext.Provider value={logMemo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
