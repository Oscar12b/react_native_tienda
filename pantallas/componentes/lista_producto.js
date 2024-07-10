// /src/pantallas/componentes/ProductList.js
import React from 'react';
import styled from 'styled-components';
import ProductCard from './carta_producto';

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  max-height: 500px; /* Adjust the height as needed */
  overflow-y: scroll; /* Enables vertical scrolling */
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const products = [
  { id: 1, name: 'Mueble Aereo', price: 223.00, imageUrl: '/path-to-images/product-image.png' },
  { id: 2, name: 'Mueble Aereo', price: 223.00, imageUrl: '/path-to-images/product-image.png' },
  { id: 3, name: 'Mueble Aereo', price: 223.00, imageUrl: '/path-to-images/product-image.png' },
  { id: 4, name: 'Mueble Aereo', price: 223.00, imageUrl: '/path-to-images/product-image.png' },
  { id: 5, name: 'Mueble Aereo', price: 223.00, imageUrl: '/path-to-images/product-image.png' },
  { id: 6, name: 'Mueble Aereo', price: 223.00, imageUrl: '/path-to-images/product-image.png' },
];

const lista_producto = () => {
  return (
    <ProductListWrapper>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductListWrapper>
  );
};

export default lista_producto;
