import Head from "next/head";
import styles from "src/styles/Home.module.css";
import Link from "next/link";
import { SignupForm } from "src/components/SignupForm/SignupForm";
import { FlashMessage } from "src/components/FlashMessage/FlashMessage";

const Signup = (props) => {
  return (
    <>
      <Head>
        <title>sign up - OpenStreetWalk</title>
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
        <FlashMessage
          notice={props.notice}
          setNotice={props.setNotice}
          alert={props.alert}
          setAlert={props.setAlert}
        />
        <main className={styles.main}>
          <SignupForm
            setIsLogin={props.setIsLogin}
            setNotice={props.setNotice}
            setAlert={props.setAlert}
          />
        </main>
      </div>
    </>
  );
};

export default Signup;
