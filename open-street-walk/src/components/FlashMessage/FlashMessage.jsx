import styles from "src/components/FlashMessage/FlashMessage.module.css";
import { useEffect } from "react";

export const FlashMessage = (props) => {
  const displayTime = 3000; // 表示時間（ミリ秒）

  //一定時間後メッセージを削除
  useEffect(() => {
    setTimeout(() => {
      props.setNotice("");
    }, displayTime);
  }, [props.notice]);

  useEffect(() => {
    setTimeout(() => {
      props.setAlert("");
    }, displayTime);
  }, [props.alert]);

  return (
    <>
      {props.notice ? (
        <div className={styles.notice}>{props.notice}</div>
      ) : null}
      {props.alert ? <div className={styles.alert}>{props.alert}</div> : null}
    </>
  );
};
