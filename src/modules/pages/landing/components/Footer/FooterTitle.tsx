import { Typography } from '@mui/material'
import React from 'react'

const FooterTitle = ({ text }: {text:string}) => {
  return (
    <Typography
    variant='h6'
    component='h6'
    sx={{
      fontWeight: '700',
      textTransform: 'capitalize',
      pb: 1,
    }}
    >
      { text }
    </Typography>
  )
}

export default FooterTitle
