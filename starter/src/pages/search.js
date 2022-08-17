import React from 'react';
import { useState } from 'react';
import * as API from "../helpers/BooksAPI"
import Item from "../components/item.js"
import {Link} from "react-router-dom"
import Book from "../helpers/book"

const Search = ({shelves,setShelves}) => {
    
    const searchItems = (event) => {
        const value = event.target.value
        if(value.length > 0)
            API.search(value,50).then(
                (books) => {
                    if(books.error)
                        setItems(books.error)
                    else          
                        setItems(books.map((book) => {
                            const shelf = shelves.filter((s)=>(s.books.filter((b)=>(b.id === book.id)).length !== 0))
                            let b = new Book(book.id,book.title,book.authors,book.imageLinks)
                            if(shelf.length !== 0)
                                b.status = shelf[0].name
                            return <Item key={book.id} update = {setShelves} book={b} shelves={shelves} />
                        }))
                }
            )
        
    }
    const [items,setItems] = useState([])
    return (
        <div className="search-books">
                <div className="search-books-bar">
                    <Link
                    className="close-search"
                    to="/"
                    >
                    </Link>
                    <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={searchItems}
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{items}</ol>
                </div>
            </div>
    )
}
export default Search