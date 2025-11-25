import css from "./App.module.css";
import { useState } from "react";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Note } from "../../types/note";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const perPage = 12;

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, perPage],
    queryFn: () => fetchNotes({ search, page, perPage }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handlePagination = ({ selected }: { selected: number }) =>
    setPage(selected + 1);

  const mutation = useMutation({
    mutationFn: (newNote: Note) => createNote(newNote),
    onSuccess: () => {
      setSearch("");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
  });

  const handleCreateNote = ({ id, title, content, tag }: Note) => {
    mutation.mutate({
      id,
      title,
      content,
      tag,
    });
  };

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  const handleSearchBox = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(e.target.value);
    },
    300
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={(e) => handleSearchBox(e)} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onChange={handlePagination}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onClick={handleDeleteNote} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={handleCreateNote} />
        </Modal>
      )}
    </div>
  );
}
