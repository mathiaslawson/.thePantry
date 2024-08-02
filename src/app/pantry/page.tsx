"use client";
import React from "react";
import styles from "../page.module.css";
import { Box } from "@mui/material";
import PantryTable from "../_components/Table";

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
      <Box className={styles.center}>
        <PantryTable />
      </Box>
      <div className={styles.grid}></div>
    </main>
  );
};

export default PantryPage;