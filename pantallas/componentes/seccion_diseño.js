import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DesignSection = () => {
    return (
        <View style={styles.container}>
            <Image source={require('./assets/design-main.jpg')} style={styles.mainImage} />
            <View style={styles.imageContainer}>
                <Image source={require('./assets/design-1.jpg')} style={styles.image} />
                <Image source={require('./assets/design-2.jpg')} style={styles.image} />
                <Image source={require('./assets/design-3.jpg')} style={styles.image} />
            </View>
            <Text style={styles.description}>
                Donec mattis porta eros, aliquet finibus risus interdum at. Nulla vivethe as it was for us to know what was to be done. the this is a long post for the text.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    image: {
        width: '30%',
        height: 100,
        borderRadius: 10,
    },
    description: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default DesignSection;
