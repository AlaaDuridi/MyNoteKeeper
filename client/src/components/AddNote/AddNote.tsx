import React, {useState} from 'react';
import {TextField, Button, Paper, Box} from '@mui/material';

interface AddNoteProps {
    onAdd: (note: { title: string; content: string }) => void;
}

const AddNote: React.FC<AddNoteProps> = ({onAdd}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCancel = () => {
        setIsExpanded(false);
        setTitle('');
        setContent('');
    };

    const handleDone = () => {
        if (title || content) {
            onAdd({title, content});
            handleCancel();
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{padding: 2, marginBottom: 2, cursor: 'pointer'}}
            onClick={!isExpanded ? handleExpand : undefined}
        >
            {!isExpanded ? (
                <TextField
                    fullWidth
                    placeholder="Take a note..."
                    variant="outlined"
                    InputProps={{readOnly: true}}
                />
            ) : (
                <Box display="flex" flexDirection="column" gap={1}>
                    <TextField
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        placeholder="Take a note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleDone} variant="contained" color="primary">
                            Done
                        </Button>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default AddNote;
