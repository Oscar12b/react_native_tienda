// /src/pantallas/componentes/SearchBar.js
import React from 'react';
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  background-color: #ffa500;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <SearchInput type="text" placeholder="Buscar" />
      <SearchButton>
        <img src="/path-to-icons/search-icon.png" alt="Buscar" />
      </SearchButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;
