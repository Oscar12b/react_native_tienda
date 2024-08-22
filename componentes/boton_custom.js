import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../utilidades/componentes'; // Asegúrate de importar correctamente la función fetchData

//IMPORTE DE LA ALERTAS
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const BotonConCarga = ({ filename, action, form = null, colorId = 1, onFetchComplete, navigateTo = null, label = 'Enviar', onPress, disabled }) => {

    //******************************************************************************************** */
    // Estados para el loading  y la navegación
    const [loading, setLoading] = useState(false);
    const [disabledButton, setDisabled] = useState(disabled);
    const navigation = useNavigation();


    //******************************************************************************************** */
    // Función que se ejecuta al presionar el botón de login
    const handlePress = async () => {

        if (onPress && !onPress()) {
            return;// esto evita que siga la consulta por si la funcion a ejecutar en el onPress retorna false
        }

        if (!filename || !action) {
            return true;
        }

        setLoading(true);
        setDisabled(true);
        try {
            const RESPONSE = await fetchData(filename, action, form);// Aquí se hace la petición a la API
            console.log(RESPONSE);
            if (onFetchComplete) {// Aquí se ejecuta la función callback
                onFetchComplete(RESPONSE);
                if (navigateTo) {
                    navigation.navigate(navigateTo);// Aquí se navega a la pantalla deseada
                }
            }

        } catch (error) {
            console.error('Error fetching data:', error);//error al hacer fetch
            setLoading(false);//finaliza el loading
            setDisabled(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'No se pudo conectar al servidor',
                button: 'Aceptar',
            })

        } finally {
            setLoading(false);//finaliza el loading
            setDisabled(false);
        }

    };


    //******************************************************************************************** */
    // Función que se ejecuta al completar la petición a la API
    const obtenerColor = (id) => {
        switch (id) {
            case 1:
                return '#000000'; // Negro
            case 2:
                return '#E34646'; // ROJO
            case 3:
                return '#800080'; // Morado
            default:
                return '#000000'; // Default color
        }
    };

    const buttonStyle = [
        styles.button,
        { backgroundColor: obtenerColor(colorId) },
        loading && styles.buttonLoading,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={handlePress}
            disabled={disabledButton}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <Text style={styles.buttonText}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonLoading: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BotonConCarga;
