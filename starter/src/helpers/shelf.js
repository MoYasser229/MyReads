module.exports = class Shelf{
    constructor(name){
        this.name = name
        this.books = []
    }
    getName(){
        return this.name
    }
    add(book){
        this.books.push(book)
    }
    remove(book){
        this.books = this.books.filter((b)=>(b.id !== book.id))
    }
    static parse(shelves){
        let myArray = []
        shelves.map(shelf => {
            let s = new Shelf(shelf.name)
            s.books = shelf.books
            myArray.push(s)
            return true
        })
        return myArray
    }
}