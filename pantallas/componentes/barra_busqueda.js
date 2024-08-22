// Importaciones de React y de componentes de React Native necesarios
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Componente de Barra de Búsqueda
const SearchBar = ({ onChangeText }) => {
  return (
    // Estructura de la Barra de Búsqueda
    <View style={styles.searchBar}>

      {/* Campo de Búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        onChangeText={onChangeText}
      />

      {/* Botón de Búsqueda */}
      <TouchableOpacity style={styles.searchButton}>
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    marginLeft: 5,
  },
});

// Exportar componente
export default SearchBar;
