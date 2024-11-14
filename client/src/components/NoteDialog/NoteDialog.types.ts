import {INote} from "../../types/models/note.model.ts";

export interface INoteDialogProps {
    note: INote,
    onClose: () => void,
    onSave: (note: INote) => void
}