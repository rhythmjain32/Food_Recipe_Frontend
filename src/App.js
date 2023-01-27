import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import ProtectedRoute from './Util/ProtectedRoute';
import Recipe from './pages/Recipe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Auth /> } />
        <Route path='/signup' element={ <Auth /> } />
        <Route path='recipe/:recipeId' element={ <Recipe /> } />
        <Route path='/' element={ <ProtectedRoute /> }>
          <Route path='recipe/add' element={ <Recipe /> } />
          <Route path='recipe/edit/:recipeId' element={ <Recipe /> } />
        </Route>
        <Route path='*' element={ <div>404 Not Found</div> } />
      </Routes>
    </Router>
  );
}

export default App;
