import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const OrderDetail = ({ route }) => {
    const { order } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.orderContainer}>
                <Image style={styles.image} source={require('../assets/placeholder-image.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.orderName}>{order.name}</Text>
                    <Text style={styles.orderPrice}>{order.price}</Text>
                </View>
            </View>
        </View>
    );
};

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

export default OrderDetail;
