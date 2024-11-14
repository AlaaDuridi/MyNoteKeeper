import {INote} from "../../types/models/note.model.ts";

export interface INoteDialogProps {
    note: INote,
    open: boolean,
    onClose: () => void,
    onSave: (note: INote) => void
}