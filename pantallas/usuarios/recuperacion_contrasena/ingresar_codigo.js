import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';


//********************************************************************************************* */
import { CLIENTES_API } from '../../../utilidades/constants';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { enviarEmail } from '../../../servicios/clientesservicios';


//********************************************************************************************* */
import CustomInput from '../../../componentes/input_custom';
import BotonConCarga from '../../../componentes/boton_custom';

const IngresarCorreo = ({ navigation }) => {


    //********************************************************************************************* */
    // Hooks para guardar valores
    const [codigoVerificacion, setCogigo] = useState('');
    const [errorCodigo, setErrorCodigo] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false); // Nuevo estado para manejar el reenvío de código


    //********************************************************************************************* */
    // Constantes
    const ROUTE = useRoute();
    const FORM_DATA = new FormData();


    //********************************************************************************************* */
    // Función para enviar el correo
    const handledOnPress = () => {
        console.log('codigoVerificacion', ROUTE.params.codigo);
        // Verifica si el campo de código está vacío
        if (!codigoVerificacion) {
            setErrorCodigo('Ingrese un código');
            return false;
        } else {
            setErrorCodigo('');
        }

        // Verifica si el código ingresado es de 6 dígitos
        if (codigoVerificacion.length < 6) {
            setErrorCodigo('Código incorrecto');
            return false;
        } else {
            setErrorCodigo('');
        }


        if (codigoVerificacion === ROUTE.params.codigo) {// Verifica si el código ingresado es igual al código enviado
            setErrorCodigo('');// Limpia el mensaje de error
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Código correcto',
                textBody: 'Código verificado correctamente',
            });
            navigation.navigate('CambiarContraseña', { email: ROUTE.params.email });// Navega a la pantalla de cambio de contraseña
        } else {
            setErrorCodigo('Código incorrecto');// Muestra un mensaje de error
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Código incorrecto',
                textBody: 'Código incorrecto',
            });
        }
    };


    //********************************************************************************************* */
    // Lógica del contador de tiempo
    useEffect(() => {
        let intervalId;
        if (timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            setCanResend(true); // Permite reenviar el código cuando el contador llega a 0
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timeLeft]);


    //********************************************************************************************* */
    // Función para reenviar el código de verificación
    const handleResendCode = async () => {
        if (canResend) {
            setTimeLeft(60); // Reinicia el contador a 60 segundos
            setCanResend(false); // Desactiva el reenvío hasta que el contador llegue a 0

            const CODIGO_RECUPERACION = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
            const RESPONSE_EMAIL = await enviarEmail(CODIGO_RECUPERACION, '-----', ROUTE.params.email)

            if (RESPONSE_EMAIL) {
                console.warn(CODIGO_RECUPERACION);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Correo enviado exitosamente',
                    textBody: 'Por favor revise su bandeja de entrada',
                })
            } else {
                console.warn('error al enviar');
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Error',
                    textBody: 'No se pudo enviar el correo',
                    button: 'Aceptar',
                })

            }
        }
    };

    return (
        <ImageBackground source={require('../../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recuperar contraseña</Text>

                    <Text style={styles.label}>Código de verificación</Text>
                    <CustomInput
                        style={styles.title}
                        containerStyle={{ marginHorizontal: 5, marginBottom: 20 }}
                        placeholder={'Código de verificación'}
                        mask="nnnnnn"
                        onChangeText={setCogigo}
                        error={errorCodigo}
                        value={codigoVerificacion}
                    />

                    <BotonConCarga
                        colorId={1}
                        onPress={handledOnPress}
                        label='Recuperar la contraseña'
                    />

                    <View style={styles.containerTextHiper}>
                        <TouchableOpacity onPress={handleResendCode} disabled={!canResend}>
                            <Text style={styles.resendCode}>
                                Reenviar codigo {canResend ? '(0.00)' : `(${timeLeft})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    containerTextHiper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 150,
    },
    formContainer: {
        width: '75%',
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#D9D9D9',
        marginBottom: 5,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
        marginLeft: '2%',
        marginTop: 30,
    },
    resendCode: {
        fontSize: 15,
        color: '#1E90FF',
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
});

export default IngresarCorreo;
