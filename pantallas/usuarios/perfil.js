import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Componente Header
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Perfil</Text>
    </View>
  );
};

// Componente ProfilePicture
const ProfilePicture = () => {
  return (
    <View style={styles.profilePictureContainer}>
      <Image source={require('./assets/profile.png')} style={styles.profilePicture} />
    </View>
  );
};

// Componente ProfileDetail
const ProfileDetail = ({ label, value }) => {
  return (
    <View style={styles.profileDetail}>
      <Text style={styles.profileDetailLabel}>{label}</Text>
      <Text style={styles.profileDetailValue}>{value}</Text>
    </View>
  );
};

// Componente Principal App
const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProfilePicture />
      <ProfileDetail label="Nombre:" value="Óscar Daniel Ramírez Martínez" />
      <ProfileDetail label="Correo:" value="oscarito_ramirez@gmail.com" />
      <View style={styles.profileDetailRow}>
        <ProfileDetail label="Grado:" value="8°" />
        <ProfileDetail label="Sección:" value="B" />
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileDetail: {
    marginVertical: 10,
    alignItems: 'center',
  },
  profileDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDetailValue: {
    fontSize: 16,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
    width: '80%',
  },
  profileDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 16,
  },
});

export default App;
