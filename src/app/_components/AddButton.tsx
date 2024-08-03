import { Button } from '@mui/material';
import React from 'react'
import { text } from 'stream/consumers';


interface Props {
  onClick?: () => void;
  textContent?: string;
  width?: string;
  children?: React.ReactNode;
  color?: string;
}

function AddButton({ onClick, textContent, width, children , color}: Props) {
  return (
    <>
     <button onClick={onClick} style={{backgroundColor: color ?? 'black', color: 'white', width: width,  borderRadius: '7px', padding: '10px', border: '1px solid #cbcbcb', cursor: 'pointer', fontSize: '16px'}}><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div>{textContent}</div>
      <div>{children}</div>
     </div>
     </button>
    </>
  )
}

export default AddButton