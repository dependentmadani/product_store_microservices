import React from 'react';
import './App.css';
import Products from './admin/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main/Main';
import ProductsCreation from './admin/ProductsCreation';
import ProductsEdit from './admin/ProductsEdit';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Main} />
          <Route path='/admin/products'  Component={Products} />
          <Route path='/admin/products/create' Component={ProductsCreation} />
          <Route path='/admin/products/:id/edit' Component={ProductsEdit} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
