import React from 'react';
import { Image, StyleSheet } from 'react-native';

const MainImage = () => {
    return <Image source={require('../../assets/icon.png')} style={styles.mainImage} />;
};

const styles = StyleSheet.create({
    mainImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});

export default MainImage;