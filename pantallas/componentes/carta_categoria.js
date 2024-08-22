// Importamos las librerías y hooks necesarios
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Componente de Carta de Categoría
const CategoryCard = ({ image, title }) => {
    return (

        // Estructura de la carta de categoría
        <View style={styles.card}>

            {/* Imagen de la categoría */}
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
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
});

// Exportar componente
export default CategoryCard;