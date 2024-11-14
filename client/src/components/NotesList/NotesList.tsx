// NoteList.tsx
import { useState, useEffect, FC } from 'react';
import { INote } from "../../types/models/note.model";
import NoteService from "../../services/notes.service";
import SearchBar from "../SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { DEBOUNCE_SEARCH_DELAY, INITIAL_PAGE_NUMBER, NOTES_PER_PAGE } from "../../constants/notes.constants";
import NoteCard from "../NoteCard";
import { Grid, Pagination, CircularProgress } from '@mui/material';

const NoteList: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_SEARCH_DELAY);
    const [notes, setNotes] = useState<INote[]>([]);
    const [page, setPage] = useState<number>(INITIAL_PAGE_NUMBER);
    const [totalPages, setTotalPages] = useState<number>(INITIAL_PAGE_NUMBER);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const response = await NoteService.list(page, NOTES_PER_PAGE, debouncedSearchTerm);
            if (response) {
                setNotes(response.notes.data);
                setTotalPages(Math.ceil(response.notes.metadata.totalCount / NOTES_PER_PAGE)); // Calculate total pages
            }
            setLoading(false);
        };
        void fetchNotes();
    }, [debouncedSearchTerm, page]);

    return (
        <div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                    {notes.map((note) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
                            <NoteCard
                                note={note}
                                onClick={(note) => console.log('will open dialog', note)}
                                onDelete={(id) => console.log('will delete note with id', id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => setPage(value)}
                style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};

export default NoteList;
