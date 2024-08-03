import { Box } from '@mui/material'
import { Package } from 'lucide-react'
import React from 'react'

function Navbar() {
  return (
   <Box display={'flex'} justifyContent={'center'} marginBottom={3} fontWeight={'bolder'}>
    <div> <Package /></div>
    <div>thePantry.</div>
    
   </Box>
  )
}

export default Navbar