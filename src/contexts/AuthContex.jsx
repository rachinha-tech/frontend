import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { push, query } = router;

  const isAuthenticated = !!user;

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

  const updateUser = async (id, dataForm) => {
    try {
      console.log(dataForm);
      const { data, message } = await api.put(`/user/${id}`, dataForm);
      // setUser({
      //   ...user,
      //   name: dataForm,
      //   date_birth: dataForm.date_birth,
      //   password: dataForm.password,
      //   password_confirmation: dataForm.password_confirmation,
      // });

      return;
    } catch (error) {}
  };

  const signOut = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        destroyCookie(undefined, "rachinha.token");

        setUser(null);
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
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
