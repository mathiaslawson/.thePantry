import styles from "./page.module.css";
import PantryPage from "./pantry/page";


interface Pantry{
  name: string; 
  quantity: number;
}


export default async function Home() {


  return (
    <main className={styles.main}>
      <PantryPage />
    </main>
  );
}
