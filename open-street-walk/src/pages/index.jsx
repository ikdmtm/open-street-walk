import Head from "next/head";
import styles from "src/styles/Home.module.css";
import Map from "src/components/Map";
import { useCallback, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Home = (props) => {
  // const [marker, setMarker] = useState([35.5623, 139.7151]);
  const [lat, setLat] = useState(35.5623);
  const [lng, setLng] = useState(139.7151);
  const [pins, setPins] = useState([]);
  const router = useRouter();
  console.log(props)

  const handleChangeLat = useCallback((e) => {
    setLat(e.target.value);
  }, []);

  const handleChangeLng = useCallback((e) => {
    setLng(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    const newPin = [Number(lat), Number(lng)];
    setPins((prevPins) => {
      if(prevPins.some(pin => pin.every((value, index) => value === newPin[index]))){
        alert("同じ位置にピンが存在します");
        return prevPins;
      }
      return [...prevPins, newPin];
    });
  }, [lat, lng]);

  console.log("lat, lng", lat, lng);
  console.log("pins", pins);
  console.log("isLogin", props.isLogin);

  //ログアウトの処理
  const url = "http://localhost:3000/auth/sign_out";
  const authSignOut = async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "uid": Cookies.get("uid"),
        "client": Cookies.get("client"),
        "access-token": Cookies.get("access-token"),
      },
    };
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Failed to sign out user from API");
      }
      console.log("Success: user has signed out.");
      //ログアウト成功でクッキーの削除
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      //ログイン状態の変更
      props.setIsLogin(false);
      console.log("success", Cookies.get("uid"));
      router.push("/"); //redirect
    } catch (error) {
      console.error(error);
      //ログアウト失敗で何もしない
    }
  };

  const button = () => {
    console.log(Cookies.get("uid"));
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
          <Link href={"/"}>open-street-walk</Link>
          {props.isLogin ? (
            <div>{Cookies.get("uid")} <button onClick={authSignOut}>ログアウト</button></div>
          ) : (
            <div>
            <Link href={"/LogIn"}>ログイン</Link> <Link href={"/New"}>新規登録</Link></div>
          )}
        </header>
        <main className={styles.main}>
          <Map pins={pins} />
          <div className={styles.inputForm}>
            <p>タイトル</p>
            <input type="text"></input>
            <p>画像</p>
            <input type="file"></input>
            <p>経度</p>
            <input type="number" onChange={handleChangeLat} value={lat}></input>
            <p>緯度</p>
            <input type="number" onChange={handleChangeLng} value={lng}></input>
            <div>
              <button onClick={handleClick}>ピン作成</button>
            </div>
          </div>
        </main>
        <button onClick={button}>クッキー情報</button>
        <footer className={styles.footer}>footer</footer>
      </div>
    </>
  );
};

export default Home;
