import css from "./App.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import { fetchNotes } from "../../services/noteService";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];

  const onChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <Toaster position="top-right" />
        <SearchBox value={search} onChange={onChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && !isLoading && (
        <ErrorMessage message="Request failed. Try again." />
      )}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
