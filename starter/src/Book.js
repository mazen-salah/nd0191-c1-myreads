import React, { useState } from 'react';
import './App.css';

function Book({ book, onShelfChange }) {
    const [shelf, setShelf] = useState(book.shelf);
 
    const handleShelfChange = (event) => {
        setShelf(event.target.value);
        onShelfChange(book, event.target.value);
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={handleShelfChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
}

export default Book;
