import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Header from './Header';
import MainImage from './MainImage';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import DesignSection from './DesignSection';
import QuoteButton from './QuoteButton';
import CategoryCard from './CategoryCard';
import BottomNavBar from './BottomNavBar';

const { width } = Dimensions.get('window');

const Inicio = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <MainImage />
                <SectionTitle title="Productos de la semana" />
                <View style={styles.productsContainer}>
                    <ProductCard image={require('./assets/product.jpg')} title="Mueble Aereo" price="$223,00" />
                    <ProductCard image={require('./assets/product.jpg')} title="Mueble Aereo" price="$223,00" />
                </View>
                <DesignSection />
                <QuoteButton onPress={() => alert('Cotizar')} />
                <SectionTitle title="Categorías" />
                <View style={styles.categoriesContainer}>
                    <CategoryCard image={require('./assets/sala.jpg')} title="Salas" />
                    <CategoryCard image={require('./assets/dormitorio.jpg')} title="Dormitorios" />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 100,
    },
    productsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginHorizontal: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginHorizontal: 10,
    },
});

export default Inicio;
