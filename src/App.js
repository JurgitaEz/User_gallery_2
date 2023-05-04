import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./Pages/HomePage";
import SingleUserPage from "./Pages/SingleUserPage";

function App() {


    return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>

                  <Route path="/user/:id" element={<SingleUserPage/>}/>
              </Routes>
          </BrowserRouter>

      </div>
    )
}

export default App;
