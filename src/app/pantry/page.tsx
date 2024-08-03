"use client";
import React from "react";
import styles from "../page.module.css";
import { Box } from "@mui/material";
import PantryTable from "../_components/Table";
import loading from '../../../public/images/board.png'

// interface Pantry{
//   name: string; 
//   quantity: number;
// }

const PantryPage = () => {
  // interface PantryItem {
  //  id: string;
  //   name: string;
  //   quantity: number;
  // }
  return (
    <main>
      <Box className={styles.main}>
        <PantryTable />
      </Box>
     
    </main>
  );
};

export default PantryPage;