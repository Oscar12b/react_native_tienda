import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductCard from '../componentes/card_productos';
import { fetchData } from '../../utilidades/componentes';
import { PRODUCTOS_API, CLIENTES_API } from '../../utilidades/constants';
import SearchBar from '../componentes/barra_busqueda';
import Header from '../componentes/header';

import { useFocusEffect } from '@react-navigation/native';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';



// Componente Principal App
const App = () => {

    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [nombreUser, setNombreUser] = useState('');

    useEffect(() => {
        iniciarSession();
        visualizarnombre();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            iniciarSession();
        }, [])
    );


    const iniciarSession = async () => {
        try {

            const RESPONSE = await fetchData(PRODUCTOS_API, 'readAll');

            if (RESPONSE.status) {
                setProducts(RESPONSE.dataset); // Update the state using the setProducts function
                console.warn(RESPONSE.dataset);
                console.log(RESPONSE.dataset);
            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al mostrar los productos',
                    textBody: 'No se pudo mostrar los productos',
                });
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al mostrar los productos',
                textBody: 'No se pudo mostrar los productos',
            });

        }

    };

    const visualizarnombre = async () => {
        const RESPONSE = await fetchData(CLIENTES_API, 'getUser');
        setNombreUser(RESPONSE.username);

    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>{nombreUser}</Text>
            <SearchBar onChangeText={setSearchText} />
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={item => item.id_mueble.toString()}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
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
