import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Componente Header
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Muebles.sv</Text>
    </View>
  );
};

// Componente SearchBar
const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <TextInput style={styles.searchInput} placeholder="Buscar" />
      <TouchableOpacity style={styles.searchButton}>
      <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Componente ProductCard
const ProductCard = ({ item }) => {
  return (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity>
        <Text style={styles.productDetails}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente Principal App
const App = () => {
  const products = [
    { id: '1', title: 'Mueble Aereo', price: '$ 223,00', image: require('./assets/mueble.png') },
    { id: '2', title: 'Mueble Aereo', price: '$ 223,00', image: require('./assets/mueble.png') },
    { id: '3', title: 'Mueble Aereo', price: '$ 223,00', image: require('./assets/mueble.png') },
    { id: '4', title: 'Mueble Aereo', price: '$ 223,00', image: require('./assets/mueble.png') },
    { id: '5', title: 'Mueble Aereo', price: '$ 223,00', image: require('./assets/mueble.png') },
    { id: '6', title: 'Mueble Aereo', price: '$ 223,00', image: require('./assets/mueble.png') },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
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
  searchButtonText: {
    fontSize: 18,
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  productDetails: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default App;
