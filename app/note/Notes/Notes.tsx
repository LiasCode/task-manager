"use client";

import { FormEvent, useState } from "react";
import newNoteStyle from "./note.module.css";

type Note = { text: string; id: string; success: boolean };

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNoteHandler = async (
    e: FormEvent<HTMLFormElement>,
    noteValue: string
  ) => {
    e.preventDefault();
    try {
      const text = noteValue;
      console.log({ text });
      if (!text) throw new Error("Invalid note");
      setNotes((prevNotes) => [
        ...prevNotes,
        { text, id: Math.random().toString(), success: false },
      ]);
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    <>
      <CreateNote addNoteHandler={addNoteHandler} />
      <NotesVisualitation notes={notes} />
    </>
  );
};

const CreateNote = ({
  addNoteHandler,
}: {
  addNoteHandler: (
    e: FormEvent<HTMLFormElement>,
    noteValue: string
  ) => Promise<void>;
}) => {
  const [newNote, setNewNote] = useState("");

  return (
    <form
      onSubmit={(e) => addNoteHandler(e, newNote)}
      className={newNoteStyle.createNote}
    >
      <input
        type="text"
        name="newNote"
        placeholder="new note"
        required
        onChange={(e) => setNewNote(e.target.value)}
        value={newNote}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const NotesVisualitation = ({ notes }: { notes: Note[] }) => {
  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <input type="checkbox" checked={note.success} />
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
