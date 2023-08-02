
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Menu from './Menu';

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const products = [
    {
      id: 1,
      name: 'Cookies',
      image: require('../assets/cookies.jpg'),
      
    },
    {
      id: 2,
      name: 'Brownies',
      image: require('../assets/brownies.jpg'),
      
    },
    {
      id: 3,
      name: 'Cupcakes',
      image: require('../assets/cup.jpg'),
      
    },
  ];

  const renderProduct = (product) => {
    return (
      <View key={product.id} style={styles.productContainer}>
        <Image source={product.image} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        {/* <Text style={styles.productPrice}>Price: ${product.price}</Text> */}
      </View>
    );
  };

  const handleViewMenu = () => {
    // Toggle the showMenu state
    setShowMenu(!showMenu);
    console.log('View Menu button pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          A heaven for your taste buds---Indulge in a symphony of flavors with our baking app! Experience the artistry of homemade delights delivered right to your doorstep. From mouthwatering cookies to delectable brownies, discover a world of heavenly treats that will awaken your taste buds and leave you craving more. Join us on a delightful journey where every bite is a moment of pure bliss. Welcome to our baking wonderland!
        </Text>
      </View>

      <View style={styles.productsContainer}>
        {products.map((product) => renderProduct(product))}
      </View>

      <TouchableOpacity onPress={handleViewMenu} style={styles.viewMenuButton}>
        <Text style={styles.viewMenuButtonText}>{showMenu ? 'Hide Menu' : 'View Menu'}</Text>
      </TouchableOpacity>

      {/* Render the Menu component conditionally */}
      {showMenu && <Menu />}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#B67F60',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  aboutContainer: {
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -15
    
  },
  aboutText: {
    fontSize: 16,
  },
  productsContainer: {
    marginBottom: 20,
  },
  productContainer: {
    marginBottom: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
  },
  viewMenuButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  viewMenuButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default Home;
