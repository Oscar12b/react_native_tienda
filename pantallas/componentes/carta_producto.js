// Importamos React y los componentes necesarios de react-native
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Componente de Carta de Producto
const ProductCard = ({ image, title, price }) => {
    return (

        // Estructura de la carta de producto
        <View style={styles.card}>

            {/* Imagen del producto */}
            <Image source={image} style={styles.image} />

            {/* Título y precio del producto */}
            <Text style={styles.title}>{title}</Text>

            {/* Precio del producto */}
            <Text style={styles.price}>{price}</Text>

            {/* Ver detalles del producto */}
            <Text style={styles.details}>Ver Detalles</Text>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    card: {
        width: '45%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
    details: {
        fontSize: 14,
        color: '#00f',
        marginTop: 5,
    },
});

// Exportar componente
export default ProductCard;