import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Register from "./Views/Register";
import Login from './Views/Login';
import Home from './Views/Home';
import CreateNote from './Views/CreateNote';
import UpdateNote from './Views/UpdateNote';
import DisplayOneNote from './Views/DisplayOneNote';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/notes' element={<Home/>} />
        <Route path='/notes/create' element={<CreateNote/>} />
        <Route path='/notes/:id/edit' element={<UpdateNote/>} />
        <Route path='/notes/:id' element={<DisplayOneNote/>} />
      </Routes>
    </div>
  );
}

export default App;
