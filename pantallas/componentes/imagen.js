// Importamos React y los componentes necesarios de react-native
import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Componente de Imagen Principal
const MainImage = () => {

    {/* Estructura de la imagen principal */}
    return <Image source={require('../../assets/icon.png')} style={styles.mainImage} />;
};

// Estilos
const styles = StyleSheet.create({
    mainImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});

// Exportar componente
export default MainImage;