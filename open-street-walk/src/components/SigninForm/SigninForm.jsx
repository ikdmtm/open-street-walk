import styles from "src/components/SigninForm/SigninForm.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export const SigninForm = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //input
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  //ログイン処理
  const url = process.env.NEXT_PUBLIC_API_URL + "/auth/sign_in";
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
        //ログイン成功でクッキーのセット
        const uidData = res.headers.get("uid");
        const clientData = res.headers.get("client");
        const accessTokenData = res.headers.get("access-token");
        const userId = data.data.id;
        Cookies.set("uid", uidData, { expires: 14 });
        Cookies.set("client", clientData, { expires: 14 });
        Cookies.set("access-token", accessTokenData, { expires: 14 });
        Cookies.set("user-id", userId, { expires: 14 });
        router.push("/"); //redirect
        props.setNotice("ログインに成功しました");
        console.log(data, uidData, clientData, accessTokenData, userId);
      } catch (error) {
        console.error(error);
        props.setAlert("ログインに失敗しました");
        //ログイン失敗でクッキーの削除
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        Cookies.remove("user-id");
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
