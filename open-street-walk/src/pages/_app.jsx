import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSignout } from "src/hooks/useSignout";
import "src/styles/globals.css";
import { useFlashMessage } from "src/hooks/useFlashMessage";

const App = ({ Component, pageProps }) => {
  //ログイン状態を管理
  const authSignout = useSignout();
  useEffect(() => {
    const token = Cookies.get("uid");
    if (token) {
      authSignout.setIsLogin(true);
    }
  }, []);

  //フラッシュメッセージ
  const flashMessage = useFlashMessage();

  return <Component {...pageProps} {...authSignout} {...flashMessage} />;
};

export default App;
