// Importa y renderiza un componente SearchBar y un componente OrderItem para cada pedido en la lista de pedidos.
import React from 'react';  // Importa el módulo React para usar sus funcionalidades.
import { View, StyleSheet, ScrollView } from 'react-native'; // Importa componentes necesarios de React Native.
import SearchBar from './pantallas/components/barra_busqueda'; // Importa el componente SearchBar desde la ruta especificada.
import OrderItem from './pantallas/components/articulo'; // Importa el componente OrderItem desde la ruta especificada.

const OrderList = () => { // Define el componente funcional OrderList.
    // Array de pedidos con ID y fecha para cada pedido.
    const orders = [

        // Define un objeto para cada pedido con un ID y una fecha.
        { id: 1, date: '30/05/2024' },
        { id: 2, date: '30/06/2024' },
        { id: 3, date: '30/07/2024' },
        { id: 4, date: '30/08/2024' },
        { id: 5, date: '30/09/2024' },
    ];

    // Renderiza el componente OrderList.
    return (

        // Estructura del componente OrderList.
        <View style={styles.container}>
            <SearchBar /> 

            {/* Contenedor de la lista de pedidos */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* Mapea cada pedido en la lista de pedidos y renderiza un componente OrderItem para cada uno. */}
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} /> /* Renderiza un OrderItem para cada pedido, usando el ID del pedido como clave única. */
                ))}
            </ScrollView>
        </View>
    );
};

// Define los estilos utilizados en el componente OrderList.
const styles = StyleSheet.create({
    container: {
        flex: 1, // Hace que el contenedor ocupe todo el espacio disponible.
        padding: 20, // Agrega un relleno de 20 unidades alrededor del contenido del contenedor.
    },
    scrollContainer: {
        paddingVertical: 20, // Agrega relleno vertical de 20 unidades dentro del ScrollView.
    },
});

export default OrderList; // Exporta el componente OrderList para que pueda ser utilizado en otras partes de la aplicación.

