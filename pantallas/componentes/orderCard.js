import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


//importe de modulos 
import BotonConCarga from '../../componentes/boton_custom';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

import { PEDIDOS_API } from '../../utilidades/constants';


const OrderCard = ({ id, fecha_pedido, estado_pedido, cantidad_pedido, precio_pedido, onPress, navigation }) => {

    //*********************************************************************************** */
    // Hooks
    const FORM_DATA = new FormData();


    //*********************************************************************************** */
    // Funciones

    const handledOnPress = async () => {

        FORM_DATA.append('idPedido', id);
        console.log('idPedido', id);
        return true;

    };


    //-----------------------------------------------------------------------------------
    //Función para poder saber cuando se completo el fecth de la consulta
    const handleFetchComplete = async (data) => {

        if (!data.status) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: data.error || 'Error al mostrar el detalle del pedido',
                textBody: 'No se pudo mostrar el detalle del pedido',
            });
        }
        else {

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: data.message || 'Detalle cargado correctamente',
                textBody: 'Se ha mostrado el detalle del pedido',
            });

            navigation.navigate('DetallePedido', { data: data.dataset, idPedido: id, estado: estado_pedido });

        }

    };


    //******************************************************** */
    //Retorno de la vista
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.id}>Pedido #{id}</Text>
                <Text style={styles.date}>Fecha: {fecha_pedido}</Text>
                <Text style={[styles.status, estado_pedido === 'Entregado' ? styles.delivered : styles.pending]}>
                    Estado: {estado_pedido}
                </Text>
                <Text style={styles.quantity}>Cantidad: {cantidad_pedido}</Text>
                <Text style={styles.price}>Precio: ${precio_pedido}</Text>
            </View>

            <BotonConCarga
                filename={PEDIDOS_API}
                action="readAllDetallePedido"
                form={FORM_DATA}
                colorId={1}
                onPress={handledOnPress}
                onFetchComplete={handleFetchComplete}
                label='Ver Detalle'
            />

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    id: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    delivered: {
        color: 'green',
    },
    pending: {
        color: 'red',
    },
    quantity: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#f9a825',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
    },
});

export default OrderCard;
