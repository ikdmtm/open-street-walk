import { useEffect, useState } from "react";
import "src/styles/globals.css";
import Cookies from "js-cookie";
import { useSignOut } from "src/hooks/useSignOut";

export default function App({ Component, pageProps }) {
  const authSignOut = useSignOut();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = Cookies.get("uid");
    if (token) {
      setIsLogin(true);
    }
  }, []);
  return <Component {...pageProps} isLogin={isLogin} setIsLogin={setIsLogin} authSignOut={authSignOut}/>;
}
