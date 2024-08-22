// components/PedidosCard.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchData } from '../../utilidades/componentes';

import { PEDIDOS_API, SERVER_URL } from '../../utilidades/constants';


import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const PedidosCard = ({ item, onPedidoEliminado }) => {
    const [cantidad, setCantidad] = useState(item.cantidad_pedido);

    const actualizarCantidad = async () => {
        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('idMueble', item.id_pedido);
            FORM_DATA.append('cantidad', cantidad);
            FORM_DATA.append('idDetalle', item.id_detalle_pedido);

            const RESPONSE = await fetchData(PEDIDOS_API, 'updateAmountOrder', FORM_DATA);

            if (RESPONSE.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Cantidad actualizada',
                    textBody: 'Se ha actualizado la cantidad',
                });

            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al actualizar la cantidad',
                    textBody: 'No se pudo actualizar la cantidad',
                });
            }
        }
        catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al actualizar la cantidad',
                textBody: 'No se pudo actualizar la cantidad',
            });
        }
    };

    const eliminarPedido = async () => {
        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('idMueble', item.id_pedido);
            FORM_DATA.append('idDetalle', item.id_detalle_pedido);

            const RESPONSE = await fetchData(PEDIDOS_API, 'deleteOrder', FORM_DATA);

            if (RESPONSE.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Pedido eliminado',
                    textBody: 'Se ha eliminado el pedido',
                });

                onPedidoEliminado(); // Notifica al componente padre
            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al eliminar el pedido',
                    textBody: 'No se pudo eliminar el pedido',
                });
            }
        }
        catch (error) {

            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al eliminar el pedido',
                textBody: 'No se pudo eliminar el pedido',
            });

        }
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: `${SERVER_URL}/imagenes/productos${item.imagen_mueble}` }} style={styles.productImage} />
            <Text style={styles.title}>{item.nombre_mueble}</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.text}>Material: {item.material_mueble}</Text>
                    <Text style={styles.text}>Color: {item.color_mueble}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Precio: ${item.precio_mueble * item.cantidad_pedido}</Text>
                    <Text style={styles.text}>Fecha de Pedido: {item.fecha_pedido}</Text>
                </View>
            </View>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(cantidad)}
                onChangeText={(text) => setCantidad(text)}
            />
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => actualizarCantidad()}>
                    <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => eliminarPedido()}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 14,
        marginVertical: 2,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        textAlign: 'center',
    },
    button: {
        width: '45%',
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    button2: {
        width: '45%',
        backgroundColor: 'red',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PedidosCard;