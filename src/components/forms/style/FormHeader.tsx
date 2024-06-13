import React from 'react'
import { formHeaderStyle } from './formStyles'

type Props = {
    children: React.ReactNode | string;
}
function FormHeader({children}: Props) {
  return (
    <h3 className={formHeaderStyle}>{children}</h3>
  )
}

export default FormHeader