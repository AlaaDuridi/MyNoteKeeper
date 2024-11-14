import { useState,FC} from 'react';
import {INoteDialogProps} from "./NoteDialog.types.ts";

const NoteDialog:FC<INoteDialogProps> = ({ note, onClose, onSave }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSave = () => {
        onSave({ ...note, title, content });
        onClose();
    };

    return (
        <div className="dialog">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={handleSave}>Done</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default NoteDialog;
