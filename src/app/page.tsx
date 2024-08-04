import Link from "next/link";
import AddButton from "./_components/AddButton";
import Navbar from "./_components/navbar";
import styles from "./page.module.css";
import PantryPage from "./pantry/page";
import { Hexagon } from "lucide-react";
import { Github } from 'lucide-react';

interface Pantry{
  name: string; 
  quantity: number;
}


export default async function Home() {


  return (
    <main className={""} style={{height: '100vh'}}>
     
     

      <div style={{display: 'flex', justifyContent: 'center'}}>
         <Link href="/pantry">
         <AddButton textContent="Check It Out"/>
        </Link>
      </div>

      <ul style={{display: "flex", justifyContent: "center", gap: "10px", listStyleType: "none", marginTop: "50px"}}>
      <Link href="https://github.com/mathiaslawson/pantry-tracker">
      <AddButton>
       <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}> <Github />Github Repository</li>
       </AddButton>
      </Link>
       
      </ul>
      
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
       <h4>Features</h4>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', textAlign: 'center'}}>
      <ul style={{listStyleType: 'none', lineHeight: '2em'}}>
         <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}><Hexagon strokeWidth={'0.5px'} size={'15px'} fill='white' color='black' />Add Items to Pantry via Manual Field Inputs</li>
         <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}><Hexagon strokeWidth={'0.5px'} size={'15px'} fill='white' color='black' />Add Items to Pantry via Image Detection</li>
         <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}><Hexagon strokeWidth={'0.5px'} size={'15px'} fill='white' color='black' />Update Items in Pantry</li>
        <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}><Hexagon strokeWidth={'0.5px'} size={'15px'} fill='white' color='black' />Delete Items from Pantry</li>
        <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}><Hexagon strokeWidth={'0.5px'} size={'15px'} fill='white' color='black' />Search for Items In Pantry</li>
        {/* <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}><Hexagon strokeWidth={'0.5px'} size={'15px'} fill='white' color='black' />Recieve Recepie Suggestions based on the Items in Pantry</li> */}
       </ul>
      </div>
    </main>
  );
}
