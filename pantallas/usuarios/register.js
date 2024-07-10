import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { fetchData, CLIENTES_API } from '../../utilidades/componentes';

const { width, height } = Dimensions.get('window');

const Register = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    const validarDatos = () => {
        if (!nombre || !apellido || !dui || !telefono || !direccion || !correo || !usuario || !clave) {
            console.error('Todos los campos son obligatorios');
            return false;
        }

        if (!validarTelefono(telefono)) {
            console.error('Formato de teléfono inválido. Debe ser 0000-0000');
            return false;
        }

        if (!validarDUI(dui)) {
            console.error('Formato de DUI inválido. Debe ser 00000000-0');
            return false;
        }

        if (!validarCorreo(correo)) {
            console.error('Formato de correo electrónico inválido');
            return false;
        }

        if (!esClaveSegura(clave)) {
            console.error('La contraseña debe contener al menos 8 caracteres y caracteres especiales');
            return false;
        }

        return true;
    };

    const registrarUsuario = async () => {
        if (!validarDatos()) {
            return;
        }

        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('nombreCliente', nombre);
            FORM_DATA.append('apellidoCliente', apellido);
            FORM_DATA.append('duiCliente', dui);
            FORM_DATA.append('telefonoCliente', telefono);
            FORM_DATA.append('direccionCliente', direccion);
            FORM_DATA.append('correoCliente', correo);
            FORM_DATA.append('aliasCliente', usuario);
            FORM_DATA.append('clavecliente', clave);
            FORM_DATA.append('confirmarClave', confirmarClave);

            const RESPONSE = await fetchData(CLIENTES_API, 'signUp', FORM_DATA);

            if (RESPONSE.status) {
                console.warn(RESPONSE.message);
                navigation.navigate('Main');
            } else {
                console.error(RESPONSE.error || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario: ', error);
        }
    };

    const validarTelefono = (telefono) => /^\d{4}-\d{4}$/.test(telefono);
    const validarDUI = (dui) => /^\d{8}-\d$/.test(dui);
    const validarCorreo = (correo) => /\S+@\S+\.\S+/.test(correo);
    const esClaveSegura = (clave) => clave.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(clave);

    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registrarme</Text>
                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                    <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
                    <TextInput style={styles.input} placeholder="DUI" value={dui} onChangeText={setDui} />
                    <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} />
                    <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
                    <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
                    <TextInput style={styles.input} placeholder="Usuario" value={usuario} onChangeText={setUsuario} />
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} value={clave} onChangeText={setClave} />
                    <TextInput style={styles.input} placeholder="Confirmar Contraseña" secureTextEntry={true} value={confirmarClave} onChangeText={setConfirmarClave} />
                    <TouchableOpacity style={styles.button} onPress={() => registrarUsuario()}>
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </TouchableOpacity>
                    <Text style={styles.firstTime}>
                        ¿Ya tienes una cuenta? <Text style={styles.register} onPress={() => navigation.navigate('Login')}>Iniciar sesión</Text>
                    </Text>
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
        paddingBottom: 30,
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
        marginTop: 20,
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
    button: {
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Register;
