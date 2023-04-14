import { PinCreateForm } from "src/components/PinCreateForm/PinCreateForm";
import styles from "src/styles/Home.module.css";
import Link from "next/link";
import { useCreatePin } from "src/hooks/useCreatePin";

const New = (props) => {
  const {
    title,
    lat,
    lng,
    imageFile,
    errorMessage,
    handleChangeTitle,
    handleChangeLat,
    handleChangeLng,
    handleChangeFile,
    createPin,
    handleGetLocation,
  } = useCreatePin();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={"/"} className={`${styles.logo} ${styles.button}`}>
          OpenStreetWalk
        </Link>
        {props.isLogin ? (
          <div>
            <span
              className={`${styles.signout} ${styles.button}`}
              onClick={props.authSignout}
            >
              ログアウト
            </span>
          </div>
        ) : (
          <div>
            <Link href={"/signin"} className={styles.button}>
              ログイン
            </Link>
            {"  "}
            <Link href={"/signup"} className={styles.button}>
              新規登録
            </Link>
          </div>
        )}
      </header>
      <main className={styles.main}>
        <div>
          <PinCreateForm
            title={title}
            lat={lat}
            lng={lng}
            imageFile={imageFile}
            errorMessage={errorMessage}
            handleChangeTitle={handleChangeTitle}
            handleChangeLat={handleChangeLat}
            handleChangeLng={handleChangeLng}
            handleChangeFile={handleChangeFile}
            createPin={createPin}
            handleGetLocation={handleGetLocation}
          />
        </div>
      </main>
    </div>
  );
};

export default New;
