import React from 'react'
import { formLabelStyle } from './formStyles'

type Props = {
    children: React.ReactNode | string;
}
function FormLabel({children}: Props) {
  return (
    <label className={formLabelStyle}>{children}</label>
  )
}

export default FormLabel