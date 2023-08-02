import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../config';
import {useNavigation} from '@react-navigation/native';

const ViewCart = ({ route }) => {
    const { selectedProduct , quantity } = route.params;
  const [selectedLocation, setSelectedLocation] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const navigation = useNavigation();
  

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleAdditionalMessageChange = (text) => {
    setAdditionalMessage(text);
  };

  const handleProceed = async () => {
    // let finalPrice = 200; // Base price
    // let orderDetails = `Product: Chocolate Brownie\nQuantity: 2\nPrice: Rs. 200\n`;
    let basePrice = selectedProduct.price * quantity;
    let totalAmount = basePrice;
    let orderDetails = `Product: ${selectedProduct.name}\nQuantity: ${quantity}\nPrice: Rs. ${basePrice}\n`;
  
    if (deliveryOption === 'delivery' && selectedLocation) {
      totalAmount += 150; // Add 150 Rs delivery fee
      orderDetails += `Delivery Fee: Rs. 150\n`;
    }
  
    try {
      
      // Store the order details in Firebase Firestore
      const orderRef = firebase.firestore().collection('orders');
      await orderRef.add({
        productName: selectedProduct.name,
        quantity: quantity,
        price: basePrice,
        deliveryOption: deliveryOption,
        location: selectedLocation,
        additionalMessage: additionalMessage,
        totalAmount: totalAmount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setAdditionalMessage('');

    Alert.alert(
      'Order Details',
      `${orderDetails}Total Amount: Rs. ${totalAmount}`,
    
      [
        {
          text: 'Confirm',
          onPress: () => {
            // Handle order confirmation
            console.log('Order confirmed');
            navigation.navigate('Home');
          },
        },
      ]
    );
  } catch (error) {
    console.log('Error storing order:', error);
    Alert.alert('Error', 'Failed to store order. Please try again.');
    }
  };



  

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Shopping Cart</Text>

      <View style={styles.productContainer}>
      <Image source={selectedProduct.image} style={styles.productImage} />
        <View style={styles.productDetails}>
       
      <Text style={styles.productName}>{selectedProduct.name}</Text>
      <Text style={styles.productQuantity}>Quantity: {quantity}</Text>
      <Text style={styles.productPrice}>Price: {selectedProduct.price}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Delivery Options</Text>
      <View style={styles.deliveryContainer}>
        <TouchableOpacity
          style={[styles.deliveryOption, deliveryOption === 'pickup' && styles.selectedOption]}
          onPress={() => setDeliveryOption('pickup')}
        >
          <Text style={styles.deliveryOptionText}>Pickup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deliveryOption, deliveryOption === 'delivery' && styles.selectedOption]}
          onPress={() => setDeliveryOption('delivery')}
        >
          <Text style={styles.deliveryOptionText}>Delivery</Text>
        </TouchableOpacity>
      </View>

      {deliveryOption === 'delivery' && (
        <View>
          <Text style={styles.sectionTitle}>Select Location</Text>
          <Picker
            selectedValue={selectedLocation}
            style={[styles.locationPicker , { borderColor: 'black', borderWidth: 1 }]}
            onValueChange={handleLocationChange}
          >
            <Picker.Item label="G-9/1,2,3,4" value="Location 1" />
            <Picker.Item label="I-8/1,2,3,4" value="Location 2" />
            <Picker.Item label="Commercial Market" value="Location 3" />
            <Picker.Item label="H-9/H-8" value="Location 4" />
            <Picker.Item label="G-8/1,2,3,4" value="Location 5" />
            
          </Picker>
        </View>
      )}

      <Text style={styles.sectionTitle}>Additional Message</Text>
      <TextInput
        style={styles.additionalMessageInput}
        placeholder="Enter additional message (optional)"
        value={additionalMessage}
        onChangeText={handleAdditionalMessageChange}
      />

      <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
      
    
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#B67F60'
    // backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    borderColor: 'black',
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
  deliveryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  deliveryOption: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#F4BA7A',
  },
  deliveryOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationPicker: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    
  },
  additionalMessageInput: {
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  proceedButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  proceedButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ViewCart;