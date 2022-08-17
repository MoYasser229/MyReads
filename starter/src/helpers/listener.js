function onChangeStatus(args){
    args.book.status = (args.status)
    if(args.status !== "none"){
        if(checkEmptyList(args.shelves)){
            const shelf = args.shelves.filter((s) => (s.name === args.status))[0]
            shelf.add(args.book)
            args.update(args.shelves)
            save(args.shelves)
        }
        else{
            const currentShelf = args.shelves.filter(
                (s) => (s.books.filter((b) => (b.id === args.book.id)).length !== 0)
            )
            if(currentShelf.length > 0)
                currentShelf[0].remove(args.book)
            const newShelf = args.shelves.filter((s)=>(s.name === args.status))[0]
            newShelf.add(args.book)
            args.update(shelves => [...shelves])
            save(args.shelves)
        }
    }
    else{
        const shelf = args.shelves.filter((s) => (s.books.filter((b)=>(b.id ===args.book.id)).length !== 0))
        shelf[0].remove(args.book)
        args.update(shelves => [...shelves])
        save(args.shelves)
    }   
    
}
function checkEmptyList(shelves){
    return (shelves.filter((s) => (s.books.length > 0))).length === 0
}
function save(shelves){
    window.localStorage.setItem("s",JSON.stringify(shelves))
}
export default onChangeStatus