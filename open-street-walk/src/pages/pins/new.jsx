import { PinCreateForm } from "src/components/PinCreateForm/PinCreateForm";
import styles from "src/styles/Home.module.css";
import Cookies from "js-cookie";
import Link from "next/link";
import { useCreatePin } from "src/hooks/useCreatePin";

const New = (props) => {
  const {
    title,
    lat,
    lng,
    imageFile,
    handleChangeTitle,
    handleChangeLat,
    handleChangeLng,
    handleChangeFile,
    createPin,
  } = useCreatePin();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={"/"}>OpenStreetWalk</Link>
        {props.isLogin ? (
          <div>
            <span className={styles.signout} onClick={props.authSignout}>
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
        <div>
          <PinCreateForm
            title={title}
            lat={lat}
            lng={lng}
            imageFile={imageFile}
            handleChangeTitle={handleChangeTitle}
            handleChangeLat={handleChangeLat}
            handleChangeLng={handleChangeLng}
            handleChangeFile={handleChangeFile}
            createPin={createPin}
          />
        </div>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
};

export default New;
