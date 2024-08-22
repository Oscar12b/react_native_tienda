import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

// Importe de servicios de el servidor
import { CLIENTES_API } from '../../utilidades/constants';
import { controlAcceso } from '../../servicios/clientesservicios';

//importe de libreria de alertas
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

//importe de modulos 
import CustomInput from '../../componentes/input_custom';
import BotonConCarga from '../../componentes/boton_custom';
//*********************************************************************

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {

    // Hooks
    //********************************************************************* */
    const [usuario, setUsuario] = useState('');
    const [errorUsuario, setErrorUsuario] = useState('');

    const [contra, setContrasena] = useState('');
    const [errorContra, setErrorContra] = useState('');
    const FORM_DATA = new FormData();


    // Efectos
    //*********************************************************************
    useEffect(() => {
        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        checkAccess(); //funcion para verificar el acceso

        return () => {
        };
    }, []);


    // Funciones
    //*********************************************************************
    const handleFetchComplete = async (data) => {
        try {
            if (!data.status) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: data.error || 'Credenciales incorrectas',
                    textBody: 'Contraseña o usuario incorrecto',
                });

                setErrorUsuario('Usuario incorrecto');
                setErrorContra('Contraseña incorrecta');

                setTimeout(() => {
                    setErrorUsuario('');
                    setErrorContra('');
                }, 2000);

            } else {
                await Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Credenciales correctas',
                    textBody: 'Ingreso al sistema exitoso',
                    button: 'Ingresar',
                });
                navigation.navigate('Main'); // Navega a la pantalla principal o la deseada
            }
        } catch (error) {
            setErrorUsuario('Usuario incorrecto');
            setErrorContra('Contraseña incorrecta');
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Credeciales incorrectas',
                textBody: 'No se pudo ingresar al sistema',
            });
        }

    };

    //Funciones de validaciones
    //*********************************************************************
    const handledPressValidacion = () => {

        //se verifica si hay un usuario
        if (!usuario) {
            setErrorUsuario('Debe ingresar un usuario');
            return false;
        } else {
            setErrorUsuario('');
        }

        //se verifica si hay una contrasena
        if (!contra) {
            setErrorContra('Debe ingresar una contraseña');
            return false;
        } else {
            setErrorContra('');
        }

        //se verifica el ususrio
        if (usuario && contra) {
            //se verifica la longitud del usuario
            if (usuario.length < 3) {
                setErrorUsuario('El usuario debe tener al menos 3 caracteres');
                return
            } else if (contra.length < 6) {//se verifica la lsongitud de la contrasena
                setErrorContra('La contraseña debe tener al menos 5 caracteres');
                return false;
            } else {
                setErrorUsuario('');
                setErrorContra('');

                // Se crea un objeto FormData para enviar los datos al servidor
                FORM_DATA.append('alias', usuario);
                FORM_DATA.append('clave', contra);

                return true;
            }

        }
    };


    // Render
    //*********************************************************************
    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Iniciar sesión</Text>
                    <Text style={styles.firstTime}>
                        ¿Primera vez que ingresas? <Text style={styles.register} onPress={() => navigation.navigate('Register')}>Registrarme</Text>
                    </Text>
                    <CustomInput
                        style={styles.title}
                        containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                        placeholder={'Usuario'}
                        error={errorUsuario}
                        onChangeText={setUsuario}
                        value={usuario}
                    />
                    <CustomInput
                        style={styles.title}
                        containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}
                        placeholder={'Contraseña'}
                        onChangeText={setContrasena}
                        error={errorContra}
                        value={contra}
                        secureTextEntry
                    />

                    <Text style={styles.forgotPassword} onPress={() => navigation.navigate('IngresarEmail')}>¿Olvidaste tu contraseña?</Text>
                    <BotonConCarga
                        filename={CLIENTES_API}
                        action="logIn"
                        form={FORM_DATA}
                        colorId={1}
                        onPress={handledPressValidacion}
                        onFetchComplete={handleFetchComplete}
                        label='Ingresar'
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
        paddingBottom: 110,
    },
    formContainer: {
        width: '75%',
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    firstTime: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 30,
    },
    register: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
    input: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#D9D9D9',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#1E90FF',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        textDecorationLine: 'underline',
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
});

export default Login;
