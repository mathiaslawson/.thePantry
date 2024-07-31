"use client";

import styles from "./page.module.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { db, auth } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';


interface Pantry{
  name: string; 
  quantity: number;
}


export default function Home() {
  const [data, setData] = useState<Pantry | unknown>({});

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantry'));
      const dataList = querySnapshot.docs.map(doc => doc.data());
      console.log(dataList, 'data list');
      setData(dataList);
    };

    fetchData();
  }, []);

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
