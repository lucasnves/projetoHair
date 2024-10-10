import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Alert } from "react-native";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  isSignedIn: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadUser() {
    const user_token = await AsyncStorage.getItem("@user_token");
    if (user_token) {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        const data = JSON.parse(user);
        api.defaults.headers.common["Authorization"] = `Bearer ${user_token}`;
        setUser(data);
      }
    }
    setIsLoading(false);
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api
        .post("login", {
          email: email,
          password: password,
        })
        .then((response) => {
          const data = response.data;
          AsyncStorage.setItem("@user_token", data.user_token);
          AsyncStorage.setItem("@user", JSON.stringify(data.user));

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.user_token}`;
          setUser(data.user);
          return response.data;
        })
        .catch((error) => {
          Alert.alert(`Login failed: ${error}`);
        });
      return response;
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    AsyncStorage.removeItem("@user_token");
    AsyncStorage.removeItem("@user");
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoading,
        isSignedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
