import styles from "src/components/SigninForm/SigninForm.module.css";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const SigninForm = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  //input
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  //ログイン処理
  const url = "https://open-street-walk-backend.fly.dev/auth/sign_in";
  const handleAuth = async () => {
    if (password && email) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: `${email}`, password: password }),
      };
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error("ログイン失敗");
        }
        console.log("ログイン成功");
        const data = await res.json();
        //ログイン状態の変更
        props.setIsLogin(true);
        const uidData = res.headers.get("uid");
        const clientData = res.headers.get("client");
        const accessTokenData = res.headers.get("access-token");
        //ログイン成功でクッキーのセット
        Cookies.set("uid", uidData, { expires: 14 });
        Cookies.set("client", clientData, { expires: 14 });
        Cookies.set("access-token", accessTokenData, { expires: 14 });
        router.push("/"); //redirect
        console.log(data, uidData, clientData, accessTokenData);
      } catch (error) {
        console.error(error);
        //ログイン失敗でクッキーの削除
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
      }
    } else {
      setErrorMessage("入力に誤りがあります");
    }
  };
  return (
    <div className={styles.inputForm}>
      <h1 className={styles.formTitle}>ログイン</h1>
      <p className={styles.error}>{errorMessage}</p>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>メールアドレス</p>
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>パスワード</p>
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <button className={styles.button} onClick={handleAuth}>
          ログイン
        </button>
      </div>
      <Link className={styles.signup} href={"/signup"}>
        新規登録
      </Link>
    </div>
  );
};
