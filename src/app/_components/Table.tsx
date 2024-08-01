"use client";

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddButton from './AddButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addToFirestore, getAllFromFirestore } from '~/lib/firebaseServices';
import { v4 as uuidv4 } from 'uuid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Item Name', width: 400 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
];

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

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

export default function PantryTable() {
  const [data, setData] = React.useState<PantryItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchPantryData = async () => {
    setLoading(true);
    try {
      const fetchedData = await getAllFromFirestore('pantry');
      setData(fetchedData ? (fetchedData as PantryItem[]) : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPantryData();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number().required('Quantity is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      id: uuidv4(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await addToFirestore({ collectionName: 'pantry', data: values });
        formik.resetForm();
        handleClose();
        await fetchPantryData(); // Refetch data after adding
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div style={{ height: 600, width: '900px' }}>
      <div>
        <AddButton onClick={handleOpen} textContent="Add Item" />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}

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

                <Box marginTop={3}>
                  <Button style={{ backgroundColor: 'black', color: 'white' }} type='submit'>
                    Add
                  </Button>
                </Box>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
