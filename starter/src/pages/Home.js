import { Link } from 'react-router-dom'
import Item from "../components/item.js"
function getBooks(books,onChange,shelves){
    if(books.length === 0)
        return "No Books"
    else
        return (books.map((book) => <Item key={book.id} update={onChange} book={book} shelves={shelves}></Item>))
}
const Home = (props) => {
        return (
            <div className="list-books">
                <div className="list-books-title"><h1>MyReads</h1></div>
                <div className="list-books-content">
                    <div>
                        {props.shelves.map(shelf => (
                            <div key={shelf.name} className="bookshelf">
                                <h2 className="bookshelf-title">{shelf.name}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {getBooks(shelf.books,props.update,props.shelves,shelf.name)}
                                    </ol>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search"></Link>
                </div>
            </div>
        )
}
export default Home