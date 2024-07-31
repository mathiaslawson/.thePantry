import { Button } from '@mui/material';
import React from 'react'


interface Props {
  onClick?: () => void;
  textContent?: string;

}

function AddButton({ onClick, textContent }: Props) {
  return (
    <>
     <button onClick={onClick} style={{backgroundColor: 'black', color: 'white', width: "150px", borderRadius: '7px', padding: '10px', border: '1px solid #cbcbcb', cursor: 'pointer', fontSize: '16px'}}>{textContent}</button>
    </>
  )
}

export default AddButton