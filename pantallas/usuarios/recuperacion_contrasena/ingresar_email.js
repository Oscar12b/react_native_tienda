import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

// ******************************************************** */
// Importe de servicios de el servidor
import { CLIENTES_API } from '../../../utilidades/constants';
import { enviarEmail } from '../../../servicios/clientesservicios';

//******************************************************** */
// Importe de librerias de alertas
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

//******************************************************** */
// Importe de modulos
import CustomInput from '../../../componentes/input_custom';
import BotonConCarga from '../../../componentes/boton_custom';


// const { width, height } = Dimensions.get('window');

const IngresarCorreo = ({ navigation }) => {
    //******************************************************** */
    // Hooks para guardar valores 

    const [correo, setCorreo] = React.useState('');
    const [errorCorreo, setErrorCorreo] = React.useState('');

    //constantes de Form para enviarlo al correo 

    const FORM_DATA = new FormData();

    //******************************************************** */
    // Función para enviar el correo
    const handledOnPress = () => {
        if (!correo) {
            setErrorCorreo('Ingrese un correo');
            return false;
        } else {
            setErrorCorreo('');
        }
        if (!/\S+@\S+\.\S+/.test(correo)) {
            setErrorCorreo('Ingrese un correo válido');
            return false;
        } else {
            setErrorCorreo('');
        }
        //se hace la verificacion final
        if (correo) {

            FORM_DATA.append('correoCliente', correo)
            setErrorCorreo('');
            return true;

        }

    };

    //******************************************************** */
    //Función para poder saber cuando se completo el fecth de la consulta
    const handleFetchComplete = async (data) => {

        if (!data.status) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: data.error || 'No se ha podido validar el correo electrónico1',
                button: 'Aceptar',
            })
            setErrorCorreo(data.error || 'No se ha podido validar el correo electrónic2o')
            return;
        } else {

            const CODIGO_RECUPERACION = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
            const RESPONSE_EMAIL = await enviarEmail(CODIGO_RECUPERACION, data.username, correo)
            console.warn(CODIGO_RECUPERACION);


            if (RESPONSE_EMAIL) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Correo enviado exitosamente',
                    textBody: 'Por favor revise su bandeja de entrada',
                })

                navigation.navigate('IngresarCodigo', { codigo: CODIGO_RECUPERACION, email: correo }); // Navega a la pantalla principal o la deseada
            }
            else {
                console.warn('error al ingresa3r');
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Ops, ocurrió un problema ',
                    textBody: 'No se pudo enviar el correo intente mas tarde',
                    button: 'Aceptar',
                })
            }

        }
    };


    //******************************************************** */
    // Renderizado de la pagina 
    return (
        <ImageBackground source={require('../../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recuperar contraseña</Text>
                    <Text style={styles.label}>Ingrese su correo:</Text>
                    <CustomInput
                        style={styles.title}
                        containerStyle={{ marginHorizontal: 5, marginBottom: 20 }}
                        placeholder={'Ingrese su email'}
                        onChangeText={setCorreo}
                        error={errorCorreo}
                        value={correo}

                    />
                    <BotonConCarga
                        filename={CLIENTES_API}
                        action="recoverPass"
                        form={FORM_DATA}
                        colorId={1}
                        onPress={handledOnPress}
                        onFetchComplete={handleFetchComplete}
                        label='Recuperar la contraseña'
                    />
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 160,
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
        marginBottom: 55,
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
});

export default IngresarCorreo;