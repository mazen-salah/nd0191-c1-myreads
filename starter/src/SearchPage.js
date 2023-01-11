import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './SearchPage.css';

class SearchPage extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query });
    this.searchBooks(query);
  }

  searchBooks = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {
        if(books.length > 0){
          this.setState({ books });
        }else{
          this.setState({ books: [] });
        }
      });
    }else{
      this.setState({ books: [] });
    }
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: state.books.map(b => {
          if(b.id === book.id) {
            b.shelf = shelf
          }
          return b;
        })
      }))
    });
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href='/'>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onShelfChange={this.handleShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
