import styles from "src/components/SigninForm/SigninForm.module.css";
import Link from "next/link";

export const SigninForm = (props) => {
  return (
    <div className={styles.inputForm}>
      <h1 className={styles.formTitle}>ログイン</h1>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>メールアドレス</p>
        <input
          type="email"
          value={props.email}
          onChange={props.handleEmail}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>パスワード</p>
        <input
          type="password"
          value={props.password}
          onChange={props.handlePassword}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <button className={styles.button} onClick={props.handleAuth}>
          ログイン
        </button>
      </div>
      <Link className={styles.signup} href={"/signup"}>
        新規登録
      </Link>
    </div>
  );
};
