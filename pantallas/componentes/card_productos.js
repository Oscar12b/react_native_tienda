import React from 'react';
import { fetchData, PEDIDOS_API } from '../../utilidades/componentes';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item }) => {

    const addToCart = async (idMueble) => {
        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('idMueble', idMueble);
            FORM_DATA.append('cantidad', '1');

            const RESPONSE = await fetchData(PEDIDOS_API, 'addCart', FORM_DATA);

            if (RESPONSE.status) {
                console.warn('Producto agregado al carrito');
            } else {
                console.error(RESPONSE.error || 'Error al agregar producto al carrito');
            }
        } catch (error) {
            console.error('No se pudo agregar al carrito: ', error);
        }
    };

    return (
        <View style={styles.productCard}>
            <Image source={{ uri: `http://192.168.1.26/api/imagenes/productos${item.imagen}` }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.nombre_mueble}</Text>
            <Text style={styles.productPrice}>{`$ ${item.precio}`}</Text>
            {item.precio_antiguo && item.precio_antiguo !== '0.00' ? (
                <Text style={styles.productOldPrice}>{`$ ${item.precio_antiguo}`}</Text>
            ) : null}
            <Text style={styles.productStock}>{`Stock: ${item.stock}`}</Text>
            <Text style={[styles.productStatus, { color: item.estado === 'disponible' ? '#4CAF50' : '#FF0000' }]}>
                {item.estado}
            </Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item.id_mueble)}>
                <Text style={styles.addToCartButtonText}>+ Agregar al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.productDetails}>
                    {`${item.nombre_material} | ${item.nombre_categoria}`}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    productOldPrice: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
        marginBottom: 5,
    },
    productStock: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    productStatus: {
        fontSize: 14,
        marginBottom: 5,
    },
    productDetails: {
        fontSize: 14,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    addToCartButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    addToCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductCard;