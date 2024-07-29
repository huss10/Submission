import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //// Importing the FontAwesomeIcon component from the 'react-fontawesome' library
// This component allows us to use Font Awesome icons in our React application.
import { v4 as uuidv4 } from 'uuid'; //// Importing the v4 function from the 'uuid' library
// This function generates unique identifiers (UUIDs), which can be used to assign unique keys to items (e.g., notes).
import { faPlus } from '@fortawesome/free-solid-svg-icons'; //// Importing the faPlus icon from the 'free-solid-svg-icons' set of Font Awesome
// This specific icon (a plus sign) can be used to visually represent actions like adding a new item.
import thumbtack from './thumbtack.PNG';
import addicon from './addicon.PNG';
import feather from './feather.PNG'
import deleteIcon from './delete.JPG'
import searchIcon from './searchicon.PNG'
import thumbtackHover from './thumbtack2.png'

function App() {
  const [notes, setNotes] = useState([
    {
      id: uuidv4(),
      title: 'Introduction of Large Language Models and Retrieval Augmented Generation',
      content: 'Roger Craig and Shakeel Avadhany',
      time: '2 mins ago',
    },
    {
      id: uuidv4(),
      title: 'Always Look on the Bright Side of Life',
      content: 'Mick Zomnir',
      time: 'yesterday',
    },
    {
      id: uuidv4(),
      title: 'And Now for Something Completely Different',
      content: 'Add Collaborators',
      time: 'a week ago',
    },
  ]);

// Using React's useState to manage the state for the search query and notes.
// The addNote function creates a new note object with a unique id and default title, content, and time.
// It then updates the state by adding the new note to the existing list of notes.

  const [searchQuery, setSearchQuery] = useState('');
  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'And Now for Something Completely Different',
      content: 'Add Collaborators',
      time: 'just now',
    };
    setNotes([...notes, newNote]);
  };

// Function to delete a note by its unique id.
// It updates the state by filtering out the note with the specified id from the existing list of notes.

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Filters the notes based on the current search query.
// It checks if the search query is included in either the title or content of each note, ignoring case.
// The filtered notes are stored in the filteredNotes variable.

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    //// A div element styled with relative positioning, sans-serif font, gray text, white background, and minimum height of the full viewport.
    <div className="relative font-sans text-gray-700 bg-white min-h-screen">
      <div className="container">
        <header>
          <h1>Notes</h1>
          <button onClick={addNote} className="add-note">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          </header>
          <div className="search-bar">
          <img src={searchIcon} alt="Search" className="searchicon" />
            <input
              type="text"
              placeholder="Search through your Notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <main>
          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-content">
                <p><b>Add your first note.</b></p>
                <button onClick={addNote} className="add-note-empty">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          ) : (
            <div className="notes-container">
              {filteredNotes.map((note, index) => (
                <div key={note.id} className="note">
                  {index === 0 ? (
                    //// For each note, display a thumbtack icon, showing a different icon for the first note.
                    <div className="note-icon">
                      <img src={thumbtack} alt="Thumbtack" className="thumbtack-icon" />
                    </div>
                  ) : (
                    <div className="note-icon">
                      <img src={thumbtackHover} alt="Thumbtack Hover" className="thumbtack-hover-icon" />
                    </div>
                  )}
                  <div className="note-content">
                    <h2>{note.title}</h2>
                    <p>
                      <span 
                        className="add-icon" 
                        style={{ backgroundImage: `url(${addicon})` }} 
                      ></span>
                      {note.content}
                      <div className="note-actions">
                    <span className="note-time">{note.time}</span>
                    <img 
                      src={deleteIcon} 
                      alt="Delete" 
                      onClick={() => deleteNote(note.id)} 
                      className="delete-icon" 
                    />
                  </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <img src={feather} alt="Feather" className="feather" />
      </div>
    </div>
  );
}

export default App;
