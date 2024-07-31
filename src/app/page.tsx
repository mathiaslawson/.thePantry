import styles from "./page.module.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { db, auth } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {Pantry} from "./pantry/page";


interface Pantry{
  name: string; 
  quantity: number;
}


export default function Home() {
 
  return (
    <main className={styles.main}>
      <Pantry />
    </main>
  );
}
