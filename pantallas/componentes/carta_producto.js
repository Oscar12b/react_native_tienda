// /src/pantallas/componentes/ProductCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 150px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1em;
  margin: 10px 0;
`;

const Price = styled.p`
  font-size: 0.9em;
  color: #888;
`;

const DetailsLink = styled.a`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Image src={product.imageUrl} alt={product.name} />
      <Title>{product.name}</Title>
      <Price>${product.price.toFixed(2)}</Price>
      <DetailsLink href="#">Ver Detalles</DetailsLink>
    </Card>
  );
};

export default ProductCard;
