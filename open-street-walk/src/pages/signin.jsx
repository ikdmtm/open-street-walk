import Head from "next/head";
import Link from "next/link";
import styles from "src/styles/Home.module.css";
import { SigninForm } from "src/components/SigninForm/SigninForm";

const SignIn = (props) => {
  return (
    <>
      <Head>
        <title>sign in - OpenStreetWalk</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={"/"} className={`${styles.logo} ${styles.button}`}>
            OpenStreetWalk
          </Link>
        </header>
        <main class={styles.main}>
          <SigninForm setIsLogin={props.setIsLogin} />
        </main>
      </div>
    </>
  );
};

export default SignIn;
