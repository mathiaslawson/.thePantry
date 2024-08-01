"use client";
import React, { Suspense, useEffect } from "react";
import styles from "../page.module.css";
import { Box, Button } from "@mui/material";
import PantryTable from "../_components/Table";
import AddButton from "../_components/AddButton";
import AddModal from "../_components/Modal";


interface Pantry{
  name: string; 
  quantity: number;
}


export const Pantry =  () => {


const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


interface PantryItem {
 id: string;
  name: string;
  quantity: number;
}
  return (
    <main>
      
      <Box className={styles.center} >
        <PantryTable />
      </Box>
      <div className={styles.grid}>
      </div>
    </main>
  );
}
