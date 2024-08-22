//Importaciones
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Componente de Detalles de Pedido
const OrderDetail = ({ route }) => {

    {/* Extraer el pedido de la ruta */}
    const { order } = route.params;

    return (

        // Estructura de los Detalles del Pedido
        <View style={styles.container}>

            {/* Contenedor del Pedido */}
            <View style={styles.orderContainer}>

                {/* Imagen del Pedido */}
                <Image style={styles.image} source={require('../assets/placeholder-image.png')} />

                {/* Contenedor de Texto */}
                <View style={styles.textContainer}>

                    {/* Nombre y Precio del Pedido */}
                    <Text style={styles.orderName}>{order.name}</Text>

                    {/* Precio del Pedido */}
                    <Text style={styles.orderPrice}>{order.price}</Text>
                </View>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    orderContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    textContainer: {
        justifyContent: 'center',
    },
    orderName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderPrice: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
});

// Exportar componente
export default OrderDetail;