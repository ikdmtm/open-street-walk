import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";

export const SignUp = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmation, setConfirmation] = useState();
  const router = useRouter();

  //input
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    []
  );
  const handleConfirmation = useCallback(
    (e) => {
      setConfirmation(e.target.value);
    },
    []
  );

  console.log(email, password, confirmation);
  //新規登録処理
  const url = "http://localhost:3000/auth";
  const handleAuth = async () => {
      if (password == confirmation) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: `${email}`, password: password }), //入力された値を入れるように変更
        };
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error("Failed to sign out");
        }
        console.log("Success: user has signed out.");
        const data = await res.json();
        //ログイン状態の変更
        props.setIsLogin(true)
        const uidData = res.headers.get("uid");
        const clientData = res.headers.get("client");
        const accessTokenData = res.headers.get("access-token");
        //新規登録成功でクッキーのセット
        Cookies.set("uid", uidData);
        Cookies.set("client", clientData);
        Cookies.set("access-token", accessTokenData);
        router.push("/"); //redirect
        console.log(data, uidData, clientData, accessTokenData);
      } catch (error) {
        console.error(error);
        //新規登録失敗でクッキーの削除
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
      }
    }
  };

  return (
    <div>
      <p>メールアドレス</p>
      <input type="email" value={email} onChange={handleEmail}></input>
      <p>パスワード</p>
      <input type="password" value={password} onChange={handlePassword}></input>
      <p>パスワード確認</p>
      <input type="password" value={confirmation} onChange={handleConfirmation}></input>
      <br />
      <button onClick={handleAuth}>新規登録</button>
    </div>
  );
};
