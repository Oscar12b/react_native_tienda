import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente Header
const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Muebles.sv</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;  