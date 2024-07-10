import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SearchBar from './pantallas/components/barra_busqueda';
import OrderItem from './pantallas/components/articulo';

const OrderList = () => {
    const orders = [
        { id: 1, date: '30/05/2024' },
        { id: 2, date: '30/06/2024' },
        { id: 3, date: '30/07/2024' },
        { id: 4, date: '30/08/2024' },
        { id: 5, date: '30/09/2024' },
    ];

    return (
        <View style={styles.container}>
            <SearchBar />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        paddingVertical: 20,
    },
});

export default OrderList;
