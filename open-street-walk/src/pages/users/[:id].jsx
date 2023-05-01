import Head from "next/head";
import styles from "src/styles/Home.module.css";
import Link from "next/link";
const MyPage = (props) => {
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
          <Link href={"/"} className={`${styles.logo} ${styles.button}`}>
            OpenStreetWalk
          </Link>
          {props.isLogin ? (
            <div>
              <Link href={"/pins/new"} className={styles.button}>
                ピン作成
              </Link>
              {"  "}
              <span
                className={`${styles.signout} ${styles.button}`}
                onClick={props.authSignout}
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
        <main className={styles.main}>
          <p>pin一覧</p>
        </main>
      </div>
    </>
  );
};

// ログイン中のユーザーのピンだけ取得するように変更
// export const getServerSideProps = async () => {
//   const url = process.env.NEXT_PUBLIC_API_URL + "/pins";
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error("ピンのデータ取得に失敗");
//     }
//     console.log("Success: ピンのデータを取得");
//     const pins = await res.json();
//     const pinsData = pins || null;
//     return {
//       props: {
//         pinsData,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         pinsData: null,
//       },
//     };
//   }
// };

export default MyPage;
