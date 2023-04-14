import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSignout } from "src/hooks/useSignout";
import "src/styles/globals.css";

const App = ({ Component, pageProps }) => {
  const authSignout = useSignout();
  useEffect(() => {
    const token = Cookies.get("uid");
    if (token) {
      authSignout.setIsLogin(true);
    }
  }, []);
  return <Component {...pageProps} {...authSignout} />;
};

export default App;
