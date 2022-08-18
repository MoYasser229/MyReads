import * as API from "./BooksAPI"
function onChangeStatus(args){
    API.update(args.book.JSON,args.status).then(() =>{
        args.book.status = args.status
        const currentShelf = args.shelves.filter(
            (s) => (s.books.filter((b) => (b.id === args.book.id)).length !== 0)
        )
        if(currentShelf.length > 0)
            currentShelf[0].remove(args.book)
        if(args.status !== "none"){
            const newShelf = args.shelves.filter((s)=>(s.name === args.status))[0]
            newShelf.add(args.book)
        }
        args.update(shelves => [...shelves])
    }).then(() => (args.status !== "none" ? alert("Successfully Added"):null))
    .catch((e) => console.log(e))
}
export default onChangeStatus