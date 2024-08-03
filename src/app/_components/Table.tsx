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
import { Camera, CameraType } from 'react-camera-pro';
import {pipeline} from '@xenova/transformers'


const columns: GridColDef[] = [
  { field: 'name', headerName: 'Item Name', width: 400 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
  { field: 'actions', headerName: 'Actions', width: 200 },
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

  // addition modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // camera modal 
  const [cameraOpen, setCameraOpen] = React.useState(false);
  const handleCameraOpen = () => setCameraOpen(true);
  const handleCameraClose = () => setCameraOpen(false);


  // preview modal
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const handlePreviewOpen = () => setPreviewOpen(true);
  const handlePreviewClose = () => setPreviewOpen(false);

// camera states
  const camera = React.useRef<CameraType>(null);
  const [image, setImage] = React.useState<string | undefined>("");
  const [numberOfCameras, setNumberOfCameras] = React.useState(0);
  const [activeDeviceId, setActiveDeviceId] = React.useState<string | undefined>(undefined);


  interface ModelResultsInterface {
    label: string;
    confidence: number;
  }

  // camera loading state
  const [modelLoading, setModelLoading] = React.useState(false);
  const [resultsLoading, setResultsLoading] = React.useState<unknown | string>({});
  const [modelResults, setModelResults] = React.useState<any>([]);




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
      quantity: 0,
      id: uuidv4(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values : { name: string, quantity: number, id: string}) => {
      setLoading(true);
      try {
        await addToFirestore({ collectionName: 'pantry', data: values });
        formik.resetForm();
        handleClose();
        await fetchPantryData(); 
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
  });


  const mlFormik = useFormik({
    initialValues: {
      name: modelResults?.label,
      quantity: 0,
      id: uuidv4(),
    },
    validationSchema: Yup.object({
      quantity: Yup.number().required('Quantity is required'),
    }),
    onSubmit: async (values : { name: string, quantity: number, id: string}) => {
       console.log(values)
      setLoading(true);
      try {
        await addToFirestore({ collectionName: 'pantry', data: {...values, name: modelResults?.label} });  
        mlFormik.resetForm();
        handlePreviewClose();
        await fetchPantryData(); 
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    
     
    },
  })


  console.log(mlFormik.errors)


React.useEffect(() => {
    const showClassification = async () => {
      setModelLoading(true);
      try {
        const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        const url = image ?? "";
        const output = await classifier(url);
        
        setModelLoading(false);
        console.log(output[0]);
        setModelResults(output[0]);
      } catch (error) {
        setModelLoading(false);
        console.error('Error during classification:', error);
      }
    };

    showClassification();
  }, [image]);
 

  return (
    <div style={{ height: 400, width: '900px' }}>


     <Box display={'flex'} justifyContent={'center'} marginBottom={3}>
      <div>
        <AddButton onClick={handleOpen} textContent="Add Item Manually" width='450px' />
      </div>
      <div>
        {/* <Camera ref={camera}> */}
        <AddButton onClick={handleCameraOpen} textContent="Add Item With Camera" width='450px' />
        {/* </Camera> */}
       
      </div>
     </Box>

     <Box display={'flex'} justifyContent={'center'} marginBottom={3} width={'max-content'}>
     <form>
     <TextField
                  id="name"
                  name='name'
                  label="Search Item"
                  variant="outlined"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  style={{
                    width: '900px',
                    marginTop: '14px',
                  
                  }}
                />
     </form>
     </Box>


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

      {/* Camera Modal */}
      <div>
        <Modal
          open={cameraOpen}
          onClose={handleCameraClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
             Use Camera to Scan Item
            </Typography> */}

            <Box marginTop={10} display={'grid'}>

        <div>
        <Camera
              ref={camera}
              aspectRatio="cover"
              facingMode="environment"
              numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
              videoSourceDeviceId={activeDeviceId}
              errorMessages={{
              noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
              permissionDenied: 'Permission denied. Please refresh and give camera permission.',
              switchCamera:
              'It is not possible to switch camera to different one because there is only one video device accessible.',
              canvas: 'Canvas is not supported.',
          }}
          videoReadyCallback={() => {
            console.log('Video feed ready.');
          }}
           />
        </div>

          <Box display={'flex'} justifyContent={'space-between'}>
          <div>
               <Button style={{ backgroundColor: 'black', color: 'white' }} type='submit'
               onClick={()=> {
                const photo = camera.current?.takePhoto();
               
                setImage(photo as string);
                handlePreviewOpen()
                handleCameraClose()
               }}
               >Take Photo</Button>
           </div>
           <div>
               <Button style={{ backgroundColor: 'black', color: 'white' }} type='submit'
               onClick={()=> {
               camera.current?.switchCamera();
               
               }}
               >Switch Camera</Button>
           </div>
          </Box>

          
            </Box>
          </Box>
        </Modal>
      </div>


      {/* Preview Modal */}
      <div>
        <Modal
          open={previewOpen}
          onClose={handlePreviewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style}>
         
       <div>

        <div style={{marginBottom: '10px'}}>
          <h4>Item Preview</h4>
          <hr />
          <p style={{fontWeight: 'lighter', fontSize: '15px'}}>ML model anlyzes your your image and identifies what specific item you are trying to add to your pantry</p>
        </div>

      <div>
        <img src={image} alt="Preview" width={'330'} height={'180'} />
      </div>

      
     {
      modelLoading
       ? <div>Loading...</div> :
      <div style={{marginTop: '15px'}}>
        <h5>Pantry Item Captured: </h5>

        <p>{modelResults?.label}</p>


<form onSubmit={mlFormik.handleSubmit}>
<div>
 <p style={{fontWeight: 'lighter', fontSize: '15px', marginTop: '17px'}}>Is <b>{modelResults?.label}</b> the item you are trying to add to your pantry?</p>
 </div>

 <TextField
                    id="quantity"
                    name='quantity'
                    label="Quantity"
                    variant="outlined"
                    type="number"
                    value={mlFormik.values.quantity}
                    onChange={mlFormik.handleChange}
                    onBlur={mlFormik.handleBlur}
                    error={mlFormik.touched.quantity && Boolean(mlFormik.errors.quantity)}
                    helperText={mlFormik.touched.quantity && mlFormik.errors.quantity}
                    style={{
                      width: '100%',
                      marginTop: '14px',
                    }}
                  /> 


     
          <Button style={{ backgroundColor: 'black', color: 'white' }} 
          // onClick={()=> {   
          //   handlePreviewClose()
          //   handleCameraClose()
          // }}
          type='submit'
        >Add Item</Button>
       
</form>
       
    

 


 {/* if not id'ed, try again */}
 <div>
 <p style={{fontWeight: 'lighter', fontSize: '15px', marginTop: '17px'}}>Does this identity what your item is? If not, try again</p>
 </div>
        <div style={{marginTop: '10px'}}>
          <Button style={{ backgroundColor: 'black', color: 'white' }} 
          onClick={()=> {
         
            handlePreviewClose()
            handleCameraClose()
           
          }}
          >Try Again</Button>
        </div>
    
      </div>

      
      }

       </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
