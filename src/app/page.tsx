import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
     
      </div>

      <div className={styles.center}>
        <h3>Deployment From lawson.dev</h3>
      </div>

      <Box display={'flex'} justifyContent={'start'}>
           <h1>Material Ui working</h1>
      </Box>

      <div className={styles.grid}>
  
     
      </div>
    </main>
  );
}
