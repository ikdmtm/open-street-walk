import styles from "src/components/SignupForm/SignupForm.module.css";
import Link from "next/link";

export const SignupForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className={styles.inputForm}>
      <h1 className={styles.formTitle}>新規登録</h1>
      <p className={styles.error}>{props.errorMessage}</p>
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
        <p className={styles.inputTitle}>パスワード確認</p>
        <input
          type="password"
          value={props.confirmation}
          onChange={props.handleConfirmation}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <button className={styles.button} onClick={props.handleAuth}>
          新規登録
        </button>
      </div>
      <Link className={styles.signin} href={"/signin"}>
        ログイン
      </Link>
    </div>
  );
};
