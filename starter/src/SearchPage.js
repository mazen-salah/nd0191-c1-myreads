import React, { useState, useEffect } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './SearchPage.css';

function SearchPage({ history }) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    searchBooks(query);
  }, [query]);

  const updateQuery = (q) => {
    setQuery(q);
  }

  const searchBooks = (q) => {
    if(q) {
      BooksAPI.search(q).then((books) => {
        if(books.length > 0){
          setBooks(books);
        }else{
          setBooks([]);
        }
      });
    }else{
      setBooks([]);
    }
  }

  const handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      setBooks(state => state.map(b => {
        if(b.id === book.id) {
          b.shelf = shelf
        }
        return b;
      }))
    });
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" href='/'>Close</a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={handleShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;

