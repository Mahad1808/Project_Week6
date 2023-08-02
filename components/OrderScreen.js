import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = ({ route }) => {
  const { selectedProduct } = route.params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handlePlaceOrder = () => {
    // Check if user is signed in
    
      // User is signed in, proceed with order placement
      Alert.alert(
        'Order Placed',
        'Your order has been placed successfully. View your order in cart.',
        [
          {
            text: 'View Cart',
            onPress: () => {
              // Handle view cart button press
              

              navigation.navigate('ViewCart', { selectedProduct, quantity });
              console.log('View Cart button pressed');
            },
          },
        ]
      );
      }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      </View>

      <Image source={selectedProduct.image} style={styles.productImage} />
      <Text style={styles.productName}>{selectedProduct.name}</Text>
      <Text style={styles.productDescription}>{selectedProduct.description}</Text>
      <Text style={styles.productPrice}>{selectedProduct.price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleDecreaseQuantity}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncreaseQuantity}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handlePlaceOrder} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>

      <View style={styles.space} />

      {/* Other products */}
      <Image source={require('../assets/cookies.jpg')} style={styles.productImage} />
      <Text style={styles.productName}>Chocolate Cookie</Text>
      <Text style={styles.productDescription}>A rich and decadent chocolate Cookie.</Text>
      <Text style={styles.productPrice}>Price: Rs.150</Text>

      <Image source={require('../assets/mc.jpg')} style={styles.productImage} />
      <Text style={styles.productName}>Marble Cake</Text>
      <Text style={styles.productDescription}>A moist and flavorful marble cake.</Text>
      <Text style={styles.productPrice}>Price: Rs.600</Text>

      {/* Add more products here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#B67F60'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  orderButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  orderButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  space: {
    height: 20,
  },
});

export default OrderScreen;




