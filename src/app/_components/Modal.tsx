"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addToFirestore } from '~/lib/firebaseServices';
import { v4 as uuidv4  } from 'uuid';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}


export default function AddModal({open, handleClose}: ModalProps)  {


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number().required('Password is required'),
 })
 
   const formik = useFormik({
     initialValues: {
       name: "", 
       quantity: "", 
       id: uuidv4()
     }, 
     validationSchema: validationSchema,
     onSubmit: (values) => {
      console.log(values);
      addToFirestore({collectionName: 'pantry', data: values});
      }
 
   })
   
 
  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Add new Pantry Item
          </Typography>
         

          <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          name='name'
          label="Item Name"
          variant="outlined"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          style={{
            width: '100%',
            marginTop: '14px',
          }}
        />

      <div>
        <TextField
          id="quantity"
          name='quantity'
          label="Quantity"
          variant="outlined"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          style={{
            width: '100%',
            marginTop: '14px',
          }}
        />
      </div>

      <Box marginTop={3} >
        <Button style={{backgroundColor: 'black', color: 'white'}} type='submit' >Add</Button>
      </Box>
        </form>
      
      </div>
      
    </div>
        </Box>
      </Modal>
    </div>
  );
}