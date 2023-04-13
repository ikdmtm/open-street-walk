import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import styles from "src/styles/Home.module.css";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { SigninForm } from "src/components/SigninForm/SigninForm";

const SignIn = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  //input
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  //ログイン処理
  const url = "http://localhost:3000/auth/sign_in";
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
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={"/"}>OpenStreetWalk</Link>
        </header>
        <main class={styles.main}>
          <SigninForm
            email={email}
            password={password}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            handleAuth={handleAuth}
          />
        </main>
      </div>
    </>
  );
};

export default SignIn;
