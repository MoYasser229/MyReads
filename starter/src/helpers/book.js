class Book{
    constructor(id,title,authors,imageLinks,status="none"){
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.imageLinks = imageLinks;
        this.status = status;
    }
    getTitle(){
        return this.title;
    }
    setJSON(JSON){
        this.JSON = JSON
    }
}
export default Book