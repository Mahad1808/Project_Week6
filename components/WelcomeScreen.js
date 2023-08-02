
import React from 'react';
import { View, Image, StyleSheet, Dimensions, Pressable , navitgate, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

     
      const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
         <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <Pressable onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};
   
// const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B67F60',
    
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 16,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;


