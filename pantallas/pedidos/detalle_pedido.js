import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useRoute } from '@react-navigation/native';

import { SERVER_URL, VALORACIONES_API } from '../../utilidades/constants';

import CustomInput from '../../componentes/input_custom';
import BotonConCarga from '../../componentes/boton_custom';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const PedidoDetalleScreen = ({ navigation }) => {
    const ROUTE = useRoute();
    const FORM_DATA = new FormData();

    // Hooks para los datos del formulario
    const [descripcion, setDescripcion] = useState('');
    const [errorDescripcion, setErrorDescripcion] = useState('');
    const [puntaje, setPuntaje] = useState(4); // Valor inicial por defecto

    const ESTADO_PEDIDO = ROUTE.params.estado;
    const PEDIDO = ROUTE.params.data;
    const ID_PEDIDO = ROUTE.params.idPedido;

    // Validación del formulario
    const handledPressValidacion = (id) => {
        if (descripcion === '') {
            setErrorDescripcion('Ingrese un comentario');
            return false;
        }
        if (descripcion.length < 10) {
            setErrorDescripcion('El comentario debe tener al menos 10 caracteres');
            return false;
        }
        if (descripcion.length > 250) {
            setErrorDescripcion('El comentario no puede tener más de 250 caracteres');
            return true;
        } else {
            FORM_DATA.append('comentario', descripcion);
            FORM_DATA.append('idDetalle', id);
            FORM_DATA.append('puntaje', puntaje); // Puntaje actualizado

            setErrorDescripcion('');
            return true;
        }
    };

    // Manejo de la respuesta de la API
    const handleFetchComplete = async (data) => {

        if (!data.status) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: data.error || 'Error al ingresar la valoración',
                textBody: 'No se pudo ingresar la valoración',
            });
        } else {
            if (data.message == 'Ya has valorado este producto') {

                setErrorDescripcion('Ya se ha ingresado una valoración para este pedido');
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Advertencia',
                    textBody: 'Ya se ha ingresado una valoración para este pedido',
                    button: 'Aceptar',
                });

            } else {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: data.message || 'Valoración ingresada correctamente',
                    textBody: 'Se ha ingresado la valoración',
                });

            }
            setErrorDescripcion('');
        }
    };

    // Renderizado
    return (
        <View style={{ flex: 1, padding: 20, marginTop: 50, backgroundColor: '#f8f9fa' }}>
            <Text style={styles.pageTitle}>Detalles del Pedido</Text>
            <FlatList
                data={PEDIDO}
                keyExtractor={(item) => item.id_detalle_pedido.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.header}>{item.nombre_mueble}</Text>
                        <Image
                            source={{ uri: `${SERVER_URL}/imagenes/productos${item.imagen}` }}
                            style={styles.image}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailText}>Color: {item.nombre_color}</Text>
                            <Text style={styles.detailText}>Material: {item.nombre_material}</Text>
                            <Text style={styles.detailText}>Cantidad: {item.cantidad_pedido}</Text>
                            <Text style={styles.detailText}>Precio: ${item.precio}</Text>
                        </View>
                        <AirbnbRating
                            count={5}
                            reviews={["Malo", "Mediocre", "Bueno", "Muy Bueno", "Excelente"]}
                            defaultRating={puntaje}
                            size={20}
                            onFinishRating={setPuntaje} // Actualización directa del puntaje
                        />
                        <CustomInput
                            style={styles.title}
                            containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                            placeholder={'Escribe un comentario'}
                            onChangeText={setDescripcion}
                            error={errorDescripcion}
                            value={descripcion}
                        />
                        <BotonConCarga
                            disabled={ESTADO_PEDIDO === 'Pendiente' ? true : false}
                            filename={VALORACIONES_API}
                            action="createValoracion"
                            form={FORM_DATA}
                            colorId={1}
                            onPress={() => handledPressValidacion(item.id_detalle_pedido)}
                            onFetchComplete={handleFetchComplete}
                            label='Ingresar valoración'
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    detailsContainer: {
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    commentInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
});

export default PedidoDetalleScreen;
