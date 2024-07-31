"use client";

import styles from "../page.module.css";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { db, auth } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PantryTable from "../_components/Table";
import AddButton from "../_components/AddButton";


const fetchPantryData = async () => {
    const querySnapshot = await getDocs(collection(db, 'pantry'));
    return querySnapshot.docs.map(doc => doc.data());
  };

interface Pantry{
  name: string; 
  quantity: number;
}


export const Pantry = async () => {


  const handleClick = () => {
    console.log("clicked");
  }

const data = await fetchPantryData();



  return (
    <main>


      <div>
        <AddButton onClick={handleClick} textContent="Add Item"></AddButton>
      </div>

      <Box className={styles.center} >
      <PantryTable />
      {/* {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )} */}
      </Box>

     

    
    

      <div className={styles.grid}>
  
     
      </div>
    </main>
  );
}
