import  { FC } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import {IConfirmDialogProps} from "./ConfirmDialog.types.ts";


const ConfirmDialog: FC<IConfirmDialogProps> = ({ open, title, onConfirm, onClose }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={onConfirm} color="primary" variant="contained">Delete</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;
