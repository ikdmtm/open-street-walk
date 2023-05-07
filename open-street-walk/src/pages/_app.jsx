import "src/styles/globals.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSignout } from "src/hooks/useSignout";
import { useFlashMessage } from "src/hooks/useFlashMessage";
import { useFormatFunction } from "src/hooks/useFormatFunction.jsx";

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
  //日付と時間をフォーマット
  const formatFunction = useFormatFunction();

  return (
    <Component
      {...pageProps}
      {...authSignout}
      {...flashMessage}
      {...formatFunction}
    />
  );
};

export default App;
