
export type NoteTag = 'Work' | 'Todo'| 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
    id: string;
    title: string;
    content: string | null;
    tag: NoteTag;
};

