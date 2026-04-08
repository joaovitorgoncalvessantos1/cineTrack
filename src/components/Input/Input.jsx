import React from 'react'
import { forwardRef } from 'react';

function Input({onChange,onClick,type,name,value,ref}) {
  return (
   <input type={type} onChange={onChange} onClick={onClick } name={name} value={value}  ref={ref}  />
  )
}

export default Input