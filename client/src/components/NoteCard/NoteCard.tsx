import {FC, useState} from 'react';
import {INoteCardProps} from "./NoteCard.types";
import {Card, CardContent, CardActions, Typography, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

const NoteCard: FC<INoteCardProps> = ({note, onClick, onDelete}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(note)}
            style={{cursor: 'pointer'}}
        >
            <CardContent>
                <Typography variant="h6" component="div">
                    {note.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {note.content}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note._id);
                    }}
                    sx={{visibility: isHovered ? 'visible' : 'hidden'}}
                >
                    <Delete color='error'/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default NoteCard;
