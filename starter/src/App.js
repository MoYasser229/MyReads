import "./App.css";
import Search from "./pages/search.js"
import { useState,useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home.js"
import Shelf from "./helpers/shelf.js"
import onChangeStatus  from "./helpers/listener.js"
import * as API from "./helpers/BooksAPI"
import Book from "./helpers/book"
function App() {
  const shelves = [new Shelf("currentlyReading"),new Shelf("wantToRead"),new Shelf("read")]
  const [s, setShelves] = useState(shelves)
  useEffect(() => {
    API.getAll().then((books) => {
      shelves.map((shelf) => {
        books.map((book) => {
          let myBook = new Book(book.id,book.title,book.authors,book.imageLinks,shelf.name)
          myBook.setJSON(book)
          if(shelf.name === book.shelf)
            shelf.add(myBook)
          return null
        })
        return null
      })
      setShelves(shelves => [...shelves])
    })
  },[])
  function handleChange(e,shelves,book) {
    onChangeStatus({status: e,shelves: shelves,book: book,update: setShelves})
  }
  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
              <Route path="/search" element = {<Search shelves={s} setShelves={handleChange} />} />
              <Route exact path="/" 
              element = {<Home shelves={s} update={handleChange}/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
