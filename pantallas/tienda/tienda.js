// /src/pantallas/tienda/tienda.js
import React from 'react';
import Header from '../componentes/encabezado';
import ProductList from '../componentes/lista_producto';

const Tienda = () => {
  return (
    <div className="Tienda">
      <Header />
      <ProductList />
    </div>
  );
};

export default Tienda;
