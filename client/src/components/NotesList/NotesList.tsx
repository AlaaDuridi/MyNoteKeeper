import {useState, useEffect, FC} from 'react';
import {INewNote, INote} from "../../types/models/note.model";
import NoteService from "../../services/notes.service";
import SearchBar from "../SearchBar";
import useDebounce from "../../hooks/useDebounce";
import {DEBOUNCE_SEARCH_DELAY, INITIAL_PAGE_NUMBER, NOTES_PER_PAGE} from "../../constants/notes.constants";
import NoteCard from "../NoteCard";
import {Grid, Box,Pagination, CircularProgress} from '@mui/material';
import AddNote from "../AddNote";
import NoteDialog from "../NoteDialog";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog.tsx";

const NoteList: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_SEARCH_DELAY);
    const [notes, setNotes] = useState<INote[]>([]);
    const [page, setPage] = useState<number>(INITIAL_PAGE_NUMBER);
    const [totalPages, setTotalPages] = useState<number>(INITIAL_PAGE_NUMBER);
    const [selectedNote, setSelectedNote] = useState<INote | undefined>();
    const [openNoteDialog, setOpenNoteDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [noteToDelete, setNoteToDelete] = useState<string | undefined>();

    const fetchNotes = async () => {
        setLoading(true);
        const response = await NoteService.list(page, NOTES_PER_PAGE, debouncedSearchTerm);
        if (response) {
            setNotes(response.notes.data);
            setTotalPages(Math.ceil(response.notes.metadata.totalCount / NOTES_PER_PAGE));
        }
        setLoading(false);
    };
    const handleAddNote = async (newNote: INewNote) => {
        const response = await NoteService.create(newNote);
        if (response) {
            alert('Note added successfully');
            void fetchNotes();
        }
    };
    const handleEditNote = (note: INote) => {
        setSelectedNote(note);
        console.log('selected note', note.title);
        setOpenNoteDialog(true);
    };

    const handleSaveNote = async (updatedNote: INote) => {
        const response = await NoteService.update(updatedNote._id, updatedNote);
        if (response) {
            setOpenNoteDialog(false);
            setSelectedNote(undefined);
           setNotes(notes.map((note) => (note._id === updatedNote._id ? updatedNote : note)));
        }
    };

    const handleDeleteNote = (id: string) => {
        setNoteToDelete(id);
        setOpenConfirmDialog(true);
    };

    const confirmDeleteNote = async () => {
        if (noteToDelete) {
            await NoteService.delete(noteToDelete);
            setNoteToDelete(undefined);
            setOpenConfirmDialog(false);
            setNotes(notes.filter((note) => note._id !== noteToDelete));
        }
    };
    useEffect(() => {
        void fetchNotes();
    }, [debouncedSearchTerm, page]);

    return (
        <div>
            <SearchBar value={searchTerm} onChange={setSearchTerm}/>
            <Box p={5}>
            <AddNote onAdd={handleAddNote}/>
            </Box>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Grid p={5} container spacing={2} style={{marginTop: '1rem'}}>
                    {notes.map((note) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
                            <NoteCard
                                note={note}
                                onClick={(note) => handleEditNote(note)}
                                onDelete={(id) => handleDeleteNote(id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => setPage(value)}
                style={{marginTop: '1rem', display: 'flex', justifyContent: 'center'}}
            />
            {openNoteDialog &&selectedNote && (
                <NoteDialog
                    open={openNoteDialog}
                    note={selectedNote}
                    onClose={() => setOpenNoteDialog(false)}
                    onSave={handleSaveNote}
                />
            )}
            {
                openConfirmDialog &&
                <ConfirmDialog
                    open={openConfirmDialog}
                    title="Are you sure you want to delete this note?"
                    onConfirm={confirmDeleteNote}
                    onClose={() => setOpenConfirmDialog(false)}
                />
            }
        </div>
    );
};

export default NoteList;
