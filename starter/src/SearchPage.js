import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import "./App.css";

function SearchPage({ history }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    searchBooks(query);
  }, [query]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setMyBooks(books);
    });
  }, []);

  const updateQuery = (q) => {
    setQuery(q);
  };

  const searchBooks = (q) => {
    if (q) {
      BooksAPI.search(q).then((books) => {
        books.map((book) => (book.shelf = "none"));
        books.map((book) => {
          myBooks.map((myBook) => {
            if (myBook.id === book.id) {
              book.shelf = myBook.shelf;
            }
          });
        });

        if (books.length > 0) {
          setBooks(books);
        } else {
          setBooks([]);
        }
      });
    } else {
      setBooks([]);
    }
  };

  const handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      setBooks((state) =>
        state.map((b) => {
          if (b.id === book.id) {
            b.shelf = shelf;
          }
          return b;
        })
      );
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" href="/">
          Close
        </a>
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
          {books.map((book) => {
            const myBook = myBooks.find((b) => b.id === book.id);
            if (myBook) {
              book.shelf = myBook.shelf;
            }
            return (
              <li key={book.id}>
                <Book book={book} onShelfChange={handleShelfChange} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;

//to make the default state of the shelf "none" if the book is not in the user's book list (myBooks) add the following code to the searchBooks function:
// if(myBook) {
//   book.shelf = myBook.shelf;
// }else{
//   book.shelf = 'none';
// }
