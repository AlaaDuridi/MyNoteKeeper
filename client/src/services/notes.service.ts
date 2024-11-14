import { INote, INoteBEResponse } from "../types/models/note.model";

const INDEX = '/api/v1/notes';

class NoteService {
    // Helper method to handle errors
    private static handleError(error: unknown): void {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert('An unexpected error occurred.');
        }
    }

    // Fetch all notes with optional pagination and search
   static async list(page: number = 1, perPage: number = 20, search: string = ''): Promise<INoteBEResponse | null> {
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                per_page: perPage.toString(),
                search,
            }).toString();

            const response = await fetch(`${INDEX}?${query}`);
            if (!response.ok) throw new Error('Failed to fetch notes');
            return await response.json();
        } catch (error) {
            NoteService.handleError(error);
            return null;
        }
    }

    // Fetch a single note by ID
   static async get(id: string): Promise<INoteBEResponse | null> {
        try {
            const response = await fetch(`${INDEX}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch note');
            return await response.json();
        } catch (error) {
            NoteService.handleError(error);
            return null;
        }
    }

    // Create a new note
    static async create(noteData: INote): Promise<INoteBEResponse | null> {
        try {
            const response = await fetch(INDEX, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });
            if (!response.ok) throw new Error('Failed to create note');
            return await response.json();
        } catch (error) {
            NoteService.handleError(error);
            return null;
        }
    }

    // Update an existing note by ID
   static async update(id: string, noteData: Partial<INote>): Promise<INoteBEResponse | null> {
        try {
            const response = await fetch(`${INDEX}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });
            if (!response.ok) throw new Error('Failed to update note');
            return await response.json();
        } catch (error) {
            NoteService.handleError(error);
            return null;
        }
    }

    // Delete a note by ID
    static async delete(id: string): Promise<{ success: boolean } | null> {
        try {
            const response = await fetch(`${INDEX}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete note');
            return await response.json();
        } catch (error) {
            NoteService.handleError(error);
            return null;
        }
    }
}

export default NoteService;
