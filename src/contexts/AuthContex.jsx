import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { push, query } = router

  const isAuthenticated = !!user;

  const signIn = async () => {
    try {
      const { url } = await api.get('/auth/redirect')
      push(url)
    } catch (error) {
      console.log(error);
    }
  };

  const callback = async () => {
    try {
      const { data: { token, user } } = await api.get('/auth/callback', {
        params: {
          ...query
        }
      })

      setCookie(undefined, "rachinha.token", token, {
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(user)

      router.replace('/', undefined, { shallow: true });

    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async () => {
    try {
      const { data } = await api.get('/auth/user')
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (query.code && query.scope && query.prompt && query.authuser) {
      callback()
    }
  }, [router])

  // useEffect(() => {
  //   const { "rachinha.token": token } = parseCookies();

  //   if (token) {
  //     getUser();
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}