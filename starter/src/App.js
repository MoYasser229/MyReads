import "./App.css";
import Search from "./pages/search.js"
import { useState,useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home.js"
import Shelf from "./helpers/shelf.js"
import onChangeStatus  from "./helpers/listener.js"


function App() {
  const shelves = [new Shelf("Currently Reading"),new Shelf("Want to read"),new Shelf("Read")]
  const [s, setShelves] = useState(shelves)
  useEffect(() => {
    const data = window.localStorage.getItem("s")
    if(data !== null){
      let ObjectParsed = Shelf.parse(JSON.parse(data))
      console.log(ObjectParsed)
      setShelves(ObjectParsed)
    }
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
