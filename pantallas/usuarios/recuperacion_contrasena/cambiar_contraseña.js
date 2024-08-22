import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

// ******************************************************** */
// Importe de servicios de el servidor
import { CLIENTES_API } from '../../../utilidades/constants';

//******************************************************** */
// Importe de librerias de alertas
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

//******************************************************** */
// Importe de modulos
import CustomInput from '../../../componentes/input_custom';
import BotonConCarga from '../../../componentes/boton_custom';


// const { width, height } = Dimensions.get('window');

const IngresarCorreo = ({ navigation }) => {


    //********************************************************************************************* */
    // Constantes
    const ROUTE = useRoute();
    const FORM_DATA = new FormData();


    //******************************************************** */
    // Hooks para guardar valores 

    const [contra, setContrasena] = React.useState('');
    const [errorContra, setErrorContra] = React.useState('');
    const [errorContraConfirm, setErrorContraConfirm] = React.useState('');
    const [contraConfirm, setContrasenaConfirm] = React.useState('');


    //******************************************************** */
    // Función para enviar el correo
    const handledOnPress = () => {
        if (contra === '') {
            setErrorContra('Ingrese una contraseña');
            return false;
        }
        if (contra.length < 6) {
            setErrorContra('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        if (contraConfirm === '') {
            setErrorContraConfirm('Ingrese una contraseña');
            return false;
        }
        if (contra !== contraConfirm) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Advertencia',
                textBody: 'Las contraseñas no coinciden',
            });
            setErrorContraConfirm('Las contraseñas no coinciden');
            return false;
        }

        FORM_DATA.append('confirmarClave', contraConfirm);
        FORM_DATA.append('claveCliente', contra);
        FORM_DATA.append('correoCliente', ROUTE.params.email);
        setErrorContra('');
        setErrorContraConfirm('');
        return true;
    }


    //******************************************************** */
    // Funcion callback para cuando el fetch se completo
    const handleFetchComplete = async (data) => {
        console.log(data);
        if (data.error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: data.error || 'Error al enviar el correo',
            });
        } else {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Contraseña cambiada',
                textBody: data.message || 'Se ha cambiado la contraseña correctamente',
            });
            navigation.navigate('Login');
        }
    };


    //******************************************************** */
    //renderizado de la pantalla
    return (
        <ImageBackground source={require('../../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recuperar contraseña</Text>
                    <Text style={styles.label}>Nueva contraseña</Text>

                    <CustomInput
                        style={styles.title}
                        containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                        placeholder={'Contraseña'}
                        onChangeText={setContrasena}
                        error={errorContra}
                        value={contra}
                        secureTextEntry
                    />

                    <CustomInput
                        style={styles.title}
                        containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                        placeholder={'Confirmar contraseña'}
                        onChangeText={setContrasenaConfirm}
                        error={errorContraConfirm}
                        value={contraConfirm}
                        secureTextEntry
                    />

                    <BotonConCarga
                        filename={CLIENTES_API}
                        action="changePass"
                        form={FORM_DATA}
                        colorId={1}
                        onPress={handledOnPress}
                        onFetchComplete={handleFetchComplete}
                        label='Cambiar contraseña'
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
        paddingBottom: 90,
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
        marginBottom: 3,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 55,
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
        marginTop: 25,
    },
    resendCode: {
        fontSize: 15,
        color: '#1E90FF',
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 30,
        textDecorationLine: 'underline',
        marginBottom: 40,
    },
});

export default IngresarCorreo;