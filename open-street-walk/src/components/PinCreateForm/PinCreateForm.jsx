import styles from "src/components/PinCreateForm/PinCreateForm.module.css";

export const PinCreateForm = (props) => {
  return (
    <div className={styles.inputForm}>
      <h1 className={styles.formTitle}>ピンの作成</h1>
      <p className={styles.error}>{props.errorMessage}</p>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>タイトル</p>
        <input
          type="text"
          onChange={props.handleChangeTitle}
          value={props.title}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>画像</p>
        <input type="file" onChange={props.handleChangeFile}></input>
      </div>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>緯度</p>
        <input
          type="number"
          onChange={props.handleChangeLat}
          value={props.lat}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <p className={styles.inputTitle}>経度</p>
        <input
          type="number"
          onChange={props.handleChangeLng}
          value={props.lng}
          className={styles.input}
        ></input>
      </div>
      <div className={styles.inputGroupe}>
        <button onClick={props.handleGetLocation}>現在地を取得</button>
      </div>
      <div className={styles.inputGroupe}>
        <button
          className={styles.button}
          onClick={() => props.createPin(props.setNotice, props.setAlert)}
        >
          ピンを作成
        </button>
      </div>
    </div>
  );
};
