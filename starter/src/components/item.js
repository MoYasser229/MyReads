import React from 'react';
const Item = (props) => {
    // let book = props.book
    // let shelves = props.shelves
    const imageStyle = {
        width: 128,
        height: 193,
        backgroundImage: `url(${props.book.imageLinks && props.book.imageLinks.thumbnail})`
    }
    const status = ["currentlyReading", "wantToRead", "read","none"]
    const onChange = (e) => {
        props.update(e.target.value,props.shelves,props.book)
    }
    
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={imageStyle}></div>
                    <div className="book-shelf-changer">
                        <select id = "status" value={props.book.status} onChange={onChange}>
                            <option value="Move" disabled>Move to...</option>
                            {status.map((s) => (<option key={s} value = {s}>{s}</option>))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
            </div>
        </li>
    )
}
export default Item