import {INewNote} from "../../types/models/note.model.ts";

export interface IAddNoteProps {
    onAdd: (note: INewNote) => void;
}