import React, { useState } from 'react';
import './App.css';

interface Note {
  id: string;
  isActive: boolean;
  content: string;
}

const noteStyles = {
  completed: {
    textDecoration: 'line-through',
    color: 'red'
  },
  uncompleted: {
    color: 'black'
  },
  deleteButton: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none'
  }
};

const initState: Note[] = [
  {
    id: 'sadnsjabdjsad',
    content: 'I have to finished my remaining tickets',
    isActive: true
  },
  {
    id: 'sadns2djsad',
    content: 'Get a job',
    isActive: false
  }
];

function App() {
  const [notes, setNotes] = useState<Note[]>(initState);

  /**
   * Create a new note with the given content and add it to the list of notes.
   * @param {string} content - string - this is the content of the note.
   */
  const createNewNote = (content: Note['content']) =>
    setNotes((prevNotes) =>
      prevNotes.concat({ id: Date.now().toString(32), content, isActive: true })
    );

  /**
   * If the id of the note passed in is not equal to the id of the note in the array, return that note.
   * @param _id - Note['id']
   */
  const deleteNote = (_id: Note['id']) =>
    setNotes((prevNotes) => prevNotes.filter(({ id }) => id !== _id));

  /**
   * We're using the React.FormEvent type to type the event parameter, and then we're using the
   * HTMLFormElement type to type the event.target property
   * @param event - React.FormEvent<HTMLFormElement>
   * @returns The return value of the function is the JSX that is rendered to the DOM.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const { noteInput } = form;

    if (!noteInput.value) return;

    createNewNote(noteInput.value);

    form.reset();
  };

  /**
   * We're mapping over the notes array, and if the note's id matches the id of the note we clicked on,
   * we're toggling the isActive property
   * @param _id - Note['id']
   */
  const handleToggle = (_id: Note['id']) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === _id ? { ...note, isActive: !note.isActive } : note
      )
    );
  };

  return (
    <div>
      <h2 className='heading'>Mi app de notas</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            name='noteInput'
            type='text'
            autoFocus
            required
            placeholder='Ingrese su nota...'
          />
          <button type='submit'>Agregar</button>
        </div>
      </form>
      <ol data-cy='notes-list' className='notes'>
        {notes?.map((note) => {
          return (
            <li
              onDoubleClick={() => handleToggle(note.id)}
              style={
                note.isActive ? noteStyles.uncompleted : noteStyles.completed
              }
              key={note.id}>
              <span>{note.content}</span>
              <button
                style={noteStyles.deleteButton}
                aria-label='delete a note'
                onClick={() => deleteNote(note.id)}>
                [X]
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
