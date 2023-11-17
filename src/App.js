
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/noteState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="mx-2 sm:mx-14 mt-8 sm:mt-12">
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/about' exact element={<About />} />
              <Route path='/login' exact element={<Login />} />
              <Route path='/signup' exact element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
