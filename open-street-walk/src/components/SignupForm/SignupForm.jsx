import styles from "src/components/SignupForm/SignupForm.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Cookies from "js-cookie";

export const SignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  //input
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleConfirmation = useCallback((e) => {
    setConfirmation(e.target.value);
  }, []);

  //新規登録処理
  const url = process.env.NEXT_PUBLIC_API_URL + "/auth";
  const handleAuth = async () => {
    if (email && password && confirmation && password == confirmation) {
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
          throw new Error("新規登録失敗");
        }
        console.log("新規登録成功");
        const data = await res.json();
        //ログイン状態の変更
        props.setIsLogin(true);
        const uidData = res.headers.get("uid");
        const clientData = res.headers.get("client");
        const accessTokenData = res.headers.get("access-token");
        const userId = data.data.id;
        //新規登録成功でクッキーのセット
        Cookies.set("uid", uidData, { expires: 14 });
        Cookies.set("client", clientData, { expires: 14 });
        Cookies.set("access-token", accessTokenData, { expires: 14 });
        Cookies.set("user-id", userId, { expires: 14 });
        router.push("/"); //redirect
        props.setNotice("新規登録が完了しました");
        console.log(data, uidData, clientData, accessTokenData);
      } catch (error) {
        console.error(error);
        props.setAlert("新規登録に失敗しました");
        //新規登録失敗でクッキーの削除
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
      <h1 className={styles.formTitle}>新規登録</h1>
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
        <p className={styles.inputTitle}>パスワード確認</p>
        <input
          type="password"
          value={confirmation}
          onChange={handleConfirmation}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <button className={styles.button} onClick={handleAuth}>
          新規登録
        </button>
      </div>
      <Link className={styles.signin} href={"/signin"}>
        ログイン
      </Link>
    </div>
  );
};
