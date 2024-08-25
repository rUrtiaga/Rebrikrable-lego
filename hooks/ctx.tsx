import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { ApiManager } from '@/app/api/ApiManager';

const AuthContext = createContext<{
  signIn: (u:string, p:string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {
          // Perform sign-in logic here
          try {
            const response = await ApiManager.postToken({username, password});
            console.log(response);
            if (!response.ok) {
              // Handle errors if response is not ok
              throw new Error("Network response was not ok");
            }
      
            const json = await response.json(); // Parse JSON response
            setSession(json.user_token); // Update state with the data received
          } catch (error) {
            console.error("Error fetching data:", error);
            // Display an alert instead of toast
            alert("Error obtaining datasets. See console for more details.");
          } 
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
