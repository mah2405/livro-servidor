import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import './App.css';

function App() {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/livros">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dados">Novo</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<LivroLista />}></Route>
        <Route path='/livros' element={<LivroLista />} />
        <Route path='/dados' element={<LivroDados  />} />
      </Routes>
    </Router>
  );
}

export default App;