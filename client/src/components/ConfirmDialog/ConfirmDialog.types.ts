export interface IConfirmDialogProps {
    open: boolean;
    title: string;
    onConfirm: () => void;
    onClose: () => void;
}