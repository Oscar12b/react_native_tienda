import React from 'react';
import { fetchData } from '../../utilidades/componentes';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { SERVER_URL, PEDIDOS_API } from '../../utilidades/constants';
//importe de libreria de alertas
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


const ProductCard = ({ item }) => {
// constatnte creada para rellenar la carta de productos
    const addToCart = async (idMueble) => {
        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('idMueble', idMueble);
            FORM_DATA.append('cantidad', '1');

            const RESPONSE = await fetchData(PEDIDOS_API, 'addCart', FORM_DATA);

            if (RESPONSE.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Producto agregado al carrito',
                    textBody: 'Se ha agregado al carrito',
                });
            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al agregar al carrito',
                    textBody: 'No se pudo agregar al carrito',
                });
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al agregar al carrito',
                textBody: 'No se pudo agregar al carrito',
            });
        }
    };

    return (
        <View style={styles.productCard}>
            <Image source={{ uri: `${SERVER_URL}/imagenes/productos${item.imagen}` }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.nombre_mueble}</Text>
            <Text style={styles.productPrice}>{`$ ${item.precio}`}</Text>
            {item.precio_antiguo && item.precio_antiguo !== '0.00' ? (
                <Text style={styles.productOldPrice}>{`$ ${item.precio_antiguo}`}</Text>
            ) : null}

            <Text style={styles.productStock}>{`Stock: ${item.stock}`}</Text>

            <Text style={styles.productStock}>{`valoración:${item.promedio_valoracion}`}</Text>

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
// estilos para la carta productos

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