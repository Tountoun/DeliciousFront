import Home from './Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cuisine from './Cuisine';
import Result from './Result';
import Recipe from './Recipe';
import { AnimatePresence } from 'framer-motion';

function Pages() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />}/>
        <Route path='/cuisine/:type' element={<Cuisine />}/>
        <Route path='/search/:key' element={<Result />}/>
        <Route path='/recipe/:id' element={<Recipe />}/>
      </Routes>
      </AnimatePresence>
    )
}

export default Pages;