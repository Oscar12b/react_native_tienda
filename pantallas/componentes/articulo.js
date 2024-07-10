import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderItem = ({ order }) => {
    return (
        <View style={styles.orderItem}>
            <Text style={styles.orderDate}>{order.date}</Text>
            <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Detalle del pedido</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: '#ffa500',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    orderButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default OrderItem;
