
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
import Signup from './components/Signup';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar></Navbar>
        <div className='mb-32'></div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path='/home/note/edit' element={<AddOrEditNote />} />
          <Route path='/home/note/add' element={<AddOrEditNote />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
