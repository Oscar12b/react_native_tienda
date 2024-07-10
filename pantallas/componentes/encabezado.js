import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Muebles.sv</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;