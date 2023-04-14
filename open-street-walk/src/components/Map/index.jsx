import dynamic from "next/dynamic";
import styles from "src/styles/Home.module.css";

const Map = dynamic(() => import("./Map"), {
  loading: () => <div className={styles.map}>読み込み中</div>,
  ssr: false,
});

export default Map;
