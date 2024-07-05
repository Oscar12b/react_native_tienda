// /src/pantallas/componentes/Header.js
import React from 'react';
import styled from 'styled-components';
import SearchBar from './barra_busqueda';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Muebles.sv</h1>
      <SearchBar />
    </HeaderWrapper>
  );
};

export default Header;
