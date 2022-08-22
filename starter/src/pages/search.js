import React from 'react';
import { useState,useEffect } from 'react';
import Item from "../components/item.js"
import {Link} from "react-router-dom"
import Book from "../helpers/book"
import * as API from "../helpers/BooksAPI"
import useDebounce from '../helpers/debounce.js';
const Search = ({shelves,setShelves}) => {
    const [items,setItems] = useState([])
    const [resultBooks,setResult] = useState([])
    const debouncedValue = useDebounce(items,100)
    useEffect(() => {
        if(items.length !== 0)
        API.search(debouncedValue,50).then(
            (books) => {
                if(books.error)
                    return null
                else          
                    setResult(books.map((book) => {
                        const shelf = shelves.filter((s)=>(s.books.filter((b)=>(b.id === book.id)).length !== 0))
                        let b = new Book(book.id,book.title,book.authors,book.imageLinks)
                        b.shelf = "none"
                        b.setJSON(book)
                        if(shelf.length !== 0)
                            b.status = shelf[0].name
                        return <Item key={book.id} update = {setShelves} book={b} shelves={shelves} />
                    }))
            }
        )
        else{
            setResult("Empty Search")
        }
    }, [debouncedValue])
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
                        onChange={(event) => {setItems(event.target.value)}}
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{resultBooks}</ol>
                </div>
            </div>
    )

}
export default Search