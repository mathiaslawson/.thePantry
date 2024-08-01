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


const handleClick = () => {
  console.log("clicked");
  setOpen(true);
}

interface PantryItem {
 id: string;
  name: string;
  quantity: number;
 
}

// const [rows, setRows] = React.useState<PantryItem[]>([]);
// const [loading, setLoading] = React.useState(false);


// useEffect(() => {
//   setLoading(true);
//   const fetchPantryData = async ()=> {
//    try {
//     const data: any = await getAllFromFirestore('pantry');
//     setRows(data)
//     setLoading(false)
//    }catch(e){
//      console.log(e);
//    }finally{
//     setLoading(false)
//    }
   
//   };


//   fetchPantryData();

// }, [rows]);


console.log(open, 'this is open')

  return (
    <main>
      <AddModal open={open} handleClose={handleClose} />


      <div>
        <AddButton onClick={handleClick} textContent="Add Item"></AddButton>
      </div>

      
      <Box className={styles.center} >
     {/* {
      loading === true ? <div>Loading...</div> :
          <PantryTable rows={rows}/>
   
      } */}

<Suspense fallback={<div>Loading...</div>}>
<PantryTable />
</Suspense>
        
       
     
      </Box>

      <div className={styles.grid}>
  
     
      </div>
    </main>
  );
}
