import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  allUserFromDb:[],
  signUp: () => {},
  login: () => {},
  signInWithGoogle: () => {},
  logout: () => {}
});

// export const AuthProvider = AuthContext.Provider;

export default function useAuth() {
    return useContext(AuthContext);
};