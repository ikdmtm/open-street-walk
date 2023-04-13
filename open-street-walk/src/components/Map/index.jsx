import dynamic from "next/dynamic";
import styles from "src/styles/Home.module.css";

const Map = dynamic(() => import("./Map"), {
  loading: () => <div className={styles.map}>A map is loading</div>,
  ssr: false,
});

export default Map;
