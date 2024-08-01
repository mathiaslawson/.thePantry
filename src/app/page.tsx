import styles from "./page.module.css";
import {Pantry} from "./pantry/page";


interface Pantry{
  name: string; 
  quantity: number;
}


export default async function Home() {


  return (
    <main className={styles.main}>
      <Pantry />
    </main>
  );
}
