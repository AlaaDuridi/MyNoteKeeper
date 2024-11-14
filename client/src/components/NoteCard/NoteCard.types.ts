import {INote} from "../../types/models/note.model.ts";

export interface INoteCardProps {
    note: INote;
    onClick: (note: INote) => void;
    onDelete: (id: string) => void;

}