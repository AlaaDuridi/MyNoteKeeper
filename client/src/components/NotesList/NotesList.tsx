import  { useState, useEffect ,FC} from 'react';
import {INote} from "../../types/models/note.model.ts";
import NoteService from "../../services/notes.service.ts";
import SearchBar from "../SearchBar";
import useDebounce from "../../hooks/useDebounce.ts";
import {DEBOUNCE_SEARCH_DELAY, INITIAL_PAGE_NUMBER, NOTES_PER_PAGE} from "../../constants/notes.constants.ts";

const NoteList:FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_SEARCH_DELAY);
    const [notes, setNotes] = useState<INote[]>([]);
    const [page, setPage] = useState<number>(INITIAL_PAGE_NUMBER);
    const [perPage, setPerPage] = useState<number>(NOTES_PER_PAGE);

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const response = await NoteService.list(page, perPage, debouncedSearchTerm);
            if (response) {
                setNotes(response.notes.data);
            }
            setLoading(false);
        };
           void fetchNotes();
    }, [debouncedSearchTerm, page, perPage]);

    return (
        <div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {loading && <p>Loading...</p>}
            <div>
                {notes.map((note) => (
                    <div key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteList;
