import { parseCookies } from "nookies";

export const requireAuthenticate = async (context, cb, levelAccess = null) => {
  const { ["rachinha.token"]: token, ["rachinha.level"]: level } =
    await parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (levelAccess !== level) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return cb({ token });
};
