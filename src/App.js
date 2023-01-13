
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { NoteState } from './context/notes/NoteState';
import AddOrEditNote from './components/AddOrEditNote';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar></Navbar>
        <div className='mb-32'></div>
        <Routes>
          <Route path='/home/note/edit' element={<AddOrEditNote edit={true} />} />
          <Route path='/home/note/add' element={<AddOrEditNote edit={false} />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
