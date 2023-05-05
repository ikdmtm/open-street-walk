import Head from "next/head";
import styles from "src/styles/Home.module.css";
import Map from "src/components/Map";
import Link from "next/link";
import { FlashMessage } from "src/components/FlashMessage/FlashMessage.jsx";

const Home = (props) => {
  // const [pins, setPins] = useState(
  //   props.pinsData.map((pin) => {
  //     return [pin.title, pin.lat, pin.lng];
  //   })
  // );
  console.log(props);

  return (
    <>
      <Head>
        <title>OpenStreetWalk</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={"/"} className={"styles.logo"}>
            OpenStreetWalk
          </Link>
          {props.isLogin ? (
            <div>
              <Link href={"/pins/new"} className={styles.button}>
                ピン作成
              </Link>
              {"　"}
              <span
                className={`${styles.signout} ${styles.button}`}
                onClick={() => props.authSignout(props.setNotice)}
              >
                ログアウト
              </span>
            </div>
          ) : (
            <div>
              <Link href={"/signin"}>ログイン</Link>
              {"　"}
              <Link href={"/signup"}>新規登録</Link>
            </div>
          )}
        </header>
        <FlashMessage
          notice={props.notice}
          setNotice={props.setNotice}
          alert={props.alert}
          setAlert={props.setAlert}
        />
        <main className={styles.main}>
          <Map pinsData={props.pinsData} />
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/pins";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("ピンのデータ取得に失敗");
    }
    console.log("Success: ピンのデータを取得");
    const pins = await res.json();
    const pinsData = pins || null;
    return {
      props: {
        pinsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        pinsData: null,
      },
    };
  }
};

export default Home;
