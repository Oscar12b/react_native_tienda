import { fetchData } from '../utilidades/componentes';
import { CLIENTES_API } from '../utilidades/constants';
import emailjs, { EmailJSResponseStatus } from '@emailjs/react-native';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


// Se añade el parámetro navigation a la función
export const controlAcceso = async (navigation) => {
    const RESPONSE = await fetchData(CLIENTES_API, 'getUser');

    // Control de acceso de las pantallas
    if (RESPONSE.status) {
        if (RESPONSE.session) {
            navigation.navigate('Main');
        } else {
            navigation.navigate('Login');
        }
    } else {
        navigation.navigate('Login');
    }
}

// CONTROL PARA SALIR DE LA SESSION 
export const cerrarSesion = async (navigation) => {
    const RESPONSE = await fetchData(CLIENTES_API, 'logOut');

    if (RESPONSE.status === 1) {
        navigation.navigate('Login');
    } else {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: RESPONSE.error || 'Error al cerrar sesión',
            textBody: 'No se pudo cerrar la sesión',
            buttontext: 'Ok',
        });

    }
}

// SERVICIO PARA ENVIAR CORREOS ELECTRONICOS POR MEDIO DE EMAILJS

export const enviarEmail = async (codigoRecuperacion, nombreEstudiante, email) => {
    const templateParams = {
        codigo_recuperación: codigoRecuperacion,
        nombre_usuario: nombreEstudiante.alias_cliente,
        email_cliente: email,
    };

    try {
        await emailjs.send(
            'service_mbllyw3', // Reemplaza con tu Service ID
            'template_khtinza', // Reemplaza con tu Template ID
            templateParams,
            {
                publicKey: '0buVENoh8O-Lr51hN', // Reemplaza con tu Public Key
            },
        );
        console.log('Correo enviado exitosamente');
        return true;
    } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
            console.error('EMAILJS FAILED...', err);
        } else {
            console.error('ERROR', err);
        }
        throw err;
    }
};
