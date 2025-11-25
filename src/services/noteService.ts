import axios from 'axios'
import type {Note, NoteTag} from '../types/note'
import { toast } from 'react-hot-toast';

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
};

interface CreateNoteProps {
    title: string, 
    content: string, 
    tag: NoteTag
}

interface FetchNotesProps {
    search: string,
    page: number, 
    perPage: number
}


const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export async function fetchNotes({search, page, perPage}: FetchNotesProps) { 
    
    if (search === '') {
        const response = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', 
        {
            params: {
                page,
                perPage,
            }
        }
    );

    return response.data;
    
    } else {
        const response = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', 
        {
            params: {
                search,
                page,
                perPage,
            }
        }
    );
    if (response.data.notes.length === 0) {
        toast.error('No notes found for your request');
    }

    return response.data;
    }
};

export async function createNote({title, content, tag}: CreateNoteProps) {
    const response = await axios.post(
      'https://notehub-public.goit.study/api/notes',
      {
        title,
        content,
        tag,
      }
    );

    return response.data;
}

export async function deleteNote( id : string) {
    const response = await axios.delete(
      `https://notehub-public.goit.study/api/notes/${id}`
    );

    return response.data;
};

