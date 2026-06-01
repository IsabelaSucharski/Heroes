import React from 'react';
import Dialog from '@mui/material/Dialog';
import {  DialogActions, DialogContent, DialogTitle } from '@mui/material';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children, actions }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
     <DialogTitle>{title}</DialogTitle>
    {children && (
      <DialogContent>
        {children}
      </DialogContent>
    )}
     {actions && (
       <DialogActions>
         {actions}
       </DialogActions>
     )}
    </Dialog>
  );
};