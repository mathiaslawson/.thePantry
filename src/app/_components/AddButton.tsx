import { Button } from '@mui/material';
import React from 'react'


interface Props {
  onClick?: () => void;
  textContent?: string;
  width?: string;
}

function AddButton({ onClick, textContent, width }: Props) {
  return (
    <>
     <button onClick={onClick} style={{backgroundColor: 'black', color: 'white', width: width,  borderRadius: '7px', padding: '10px', border: '1px solid #cbcbcb', cursor: 'pointer', fontSize: '16px'}}>{textContent}</button>
    </>
  )
}

export default AddButton