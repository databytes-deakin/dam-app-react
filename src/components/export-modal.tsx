import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const DialogWrapper = styled(Dialog)``;

export const ExportModal = (props: {onClose:() => void, open: boolean}) => {
  return (
    <DialogWrapper open={props.open} onClose={props.onClose}>
      <DialogTitle>
          <h2>Exit</h2>
          <IconButton onClick={props.onClose}>
            <Close />
          </IconButton>
      </DialogTitle>
      <DialogContent>
        <span>Dialog Content</span>
      </DialogContent>
    </DialogWrapper>
  )
}
