import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { push, query } = router;

  const isAuthenticated = !!user;

  const signIns = async ({ login, password }) => {
    try {
      const { data } = await api.post("/login", {
        login: login,
        password: password,
      });

      setCookie(undefined, "rachinha.token", data.token, {
        path: "/",
      });

      setUser({ ...user });

      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = ({ login, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post("/login", {
          login: login,
          password: password,
        });

        setCookie(undefined, "rachinha.token", data.token, {
          path: "/",
        });

        setUser({ ...user });

        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user, token } = await api.get("/user/profile");

        setUser(user);

        setCookie(undefined, "rachinha.token", token, {
          path: "/",
        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    const { "rachinha.token": token } = parseCookies();

    if (token) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
