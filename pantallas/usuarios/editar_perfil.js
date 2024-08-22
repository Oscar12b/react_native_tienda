import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { fetchData } from '../../utilidades/componentes';
import { CLIENTES_API } from '../../utilidades/constants';
import { cerrarSesion, controlAcceso } from '../../servicios/clientesservicios';
import CustomInput from '../../componentes/input_custom';
import BotonConCarga from '../../componentes/boton_custom';
import Header from '../componentes/header';


import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');

const Register = ({ navigation }) => {

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [errorNombreUsuario, setErrorNombreUsuario] = useState('');

    const [nombre, setNombre] = useState('');
    const [errorNombre, setErrorNombre] = useState('');

    const [apellido, setApellido] = useState('');
    const [errorApellido, setErrorApellido] = useState('');

    const [dui, setDui] = useState('');
    const [errorDui, setErrorDui] = useState('');

    const [telefono, setTelefono] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');

    const [direccion, setDireccion] = useState('');
    const [errorDireccion, setErrorDireccion] = useState('');

    const [correo, setCorreo] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');

    const [usuario, setUsuario] = useState('');

    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        const RellenarDatos = async () => {
            const RESPONSE = await fetchData(CLIENTES_API, 'readProfile');
            console.warn(RESPONSE);
            if (RESPONSE.status === 1) {
                const ROW = RESPONSE.dataset;
                setDataUser(ROW);
                setNombreUsuario(ROW.alias_cliente);
                setNombre(ROW.nombre_cliente);
                setApellido(ROW.apellido_cliente);
                setDui(ROW.dui_cliente);
                setTelefono(ROW.telefono_cliente);
                setDireccion(ROW.direccion_cliente);
                setCorreo(ROW.correo_cliente);
                setUsuario(ROW.alias_cliente);
            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al obtener los datos',
                    textBody: 'No se pudo obtener los datos',
                });
            }
        };

        // Ejecuta las funciones
        RellenarDatos();
        checkAccess();

        // Limpieza
        return () => { };
    }, [navigation]);



    const handleValidation = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const duiRegex = /^\d{8}-\d{1}$/;
        const telefonoRegex = /^\d{4}-\d{4}$/;

        // Verificar si todos los campos son iguales a los datos originales
        if (
            nombreUsuario === dataUser.alias_cliente &&
            nombre === dataUser.nombre_cliente &&
            apellido === dataUser.apellido_cliente &&
            dui === dataUser.dui_cliente &&
            telefono === dataUser.telefono_cliente &&
            direccion === dataUser.direccion_cliente &&
            correo === dataUser.correo_cliente
        ) {
            isValid = false;
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'No se ha modificado ningún dato',
                textBody: 'No se ha modificado ningún dato',
                button: 'Aceptar',
            });
            isValid = false; // Retorna inmediatamente si los datos no han cambiado
            return isValid;
        }

        if (!nombreUsuario) {
            setErrorNombreUsuario('Debe ingresar un nombre de usuario');
            isValid = false;
        } else if (nombreUsuario.length < 4) {
            setErrorNombreUsuario('El nombre de usuario debe tener al menos 4 caracteres');
            isValid = false;
        } else {
            setErrorNombreUsuario('');
        }

        if (!nombre) {
            setErrorNombre('Debe ingresar un nombre');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            setErrorNombre('El nombre solo puede contener letras y espacios');
            isValid = false;
        } else {
            setErrorNombre('');
        }

        if (!apellido) {
            setErrorApellido('Debe ingresar un apellido');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
            setErrorApellido('El apellido solo puede contener letras y espacios');
            isValid = false;
        } else {
            setErrorApellido('');
        }

        if (!dui) {
            setErrorDui('Debe ingresar un DUI');
            isValid = false;
        } else if (!duiRegex.test(dui)) {
            setErrorDui('El DUI debe tener el formato 00000000-0');
            isValid = false;
        } else {
            setErrorDui('');
        }

        if (!telefono) {
            setErrorTelefono('Debe ingresar un teléfono');
            isValid = false;
        } else if (!telefonoRegex.test(telefono)) {
            setErrorTelefono('El teléfono debe tener 8 dígitos');
            isValid = false;
        } else {
            setErrorTelefono('');
        }

        if (!direccion) {
            setErrorDireccion('Debe ingresar una dirección');
            isValid = false;
        } else if (direccion.length < 10) {
            setErrorDireccion('La dirección debe tener al menos 10 caracteres');
            isValid = false;
        } else {
            setErrorDireccion('');
        }

        if (!correo) {
            setErrorCorreo('Debe ingresar un correo electrónico');
            isValid = false;
        } else if (!emailRegex.test(correo)) {
            setErrorCorreo('Debe ingresar un correo electrónico válido');
            isValid = false;
        } else {
            setErrorCorreo('');
        }

        return isValid;
    };


    const RegistrarUsuario = async () => {
        if (handleValidation()) {
            try {
                const FORM_DATA = new FormData();

                FORM_DATA.append('nombreCliente', nombre);
                FORM_DATA.append('apellidoCliente', apellido);
                FORM_DATA.append('correCliente', correo);
                FORM_DATA.append('aliasCliente', usuario);
                FORM_DATA.append('duiCliente', dui);
                FORM_DATA.append('telefonoCliente', telefono);
                FORM_DATA.append('direccionCliente', direccion);

                const RESPONSE = await fetchData(CLIENTES_API, 'editProfile', FORM_DATA);

                if (RESPONSE.status === 1 && RESPONSE.session === 1) {

                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Perfil actualizado',
                        textBody: 'Se ha actualizado el perfil',
                    });

                } else {
                    throw new Error(RESPONSE.error || 'Error al actualizar el perfil');
                }
            } catch (error) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: error.message || 'Error al actualizar el perfil',
                    textBody: 'No se pudo actualizar el perfil',
                });

            }
        }
    };

    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.backgroundImage}>
            <Header />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Editar perfil</Text>
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="Nombre Usuario"
                        error={errorNombreUsuario}
                        onChangeText={setNombreUsuario}
                        value={nombreUsuario}
                        texto={nombreUsuario}
                    />
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="Nombre"
                        error={errorNombre}
                        onChangeText={setNombre}
                        value={nombre}
                        texto={nombre}
                    />
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="Apellido"
                        error={errorApellido}
                        onChangeText={setApellido}
                        value={apellido}
                        texto={apellido}
                    />
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="DUI"
                        error={errorDui}
                        onChangeText={setDui}
                        value={dui}
                        texto={dui}
                    />
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="Teléfono"
                        error={errorTelefono}
                        onChangeText={setTelefono}
                        value={telefono}
                        texto={telefono}
                    />
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="Dirección"
                        error={errorDireccion}
                        onChangeText={setDireccion}
                        value={direccion}
                        texto={direccion}
                    />
                    <CustomInput
                        containerStyle={{ marginBottom: 20 }}
                        placeholder="Correo"
                        error={errorCorreo}
                        onChangeText={setCorreo}
                        value={correo}
                        texto={correo}
                    />
                    <BotonConCarga
                        filename={CLIENTES_API}
                        action="editProfile"
                        form={new FormData()}
                        colorId={1}
                        onPress={RegistrarUsuario}
                        label="Actualizar"
                    />
                    <TouchableOpacity style={styles.link} onPress={() => cerrarSesion(navigation)}>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
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
    link: {
        width: '100%',
        alignItems: 'center',
        color: '#1E90FF',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 16,
    },
});

export default Register;
