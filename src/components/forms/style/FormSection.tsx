import React from 'react'
import { formContainerStyle } from './formStyles'

type Props = {
    children: React.ReactNode | string;
}

function FormSection({children}: Props) {
  return (
    <div className={formContainerStyle}>{children}</div>
  )
}

export default FormSection