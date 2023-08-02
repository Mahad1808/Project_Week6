import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking , Image , ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from  '../config';

const ContactUs = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const feedbacksRef = firebase.firestore().collection('feedback');
    const unsubscribe = feedbacksRef.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbacks(data);
    });

    return () => unsubscribe();
  }, []);

  // const handleSubmission = () => {
  //   // Perform submission logic here
  //   console.log('Form submitted:', name, email, message);
  //   // Reset form fields
  //   setName('');
  //   setEmail('');
  //   setMessage('');
  // };

  const handleSubmission = () => {
    if (!name || !email || !message) {
      Alert.alert('Missing Fields', 'Please fill in all the fields');
      return;
    }

    const feedbacksRef = firebase.firestore().collection('feedback');
    feedbacksRef
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setName('');
        setEmail('');
        setMessage('');
        Alert.alert('Your feedback has been submitted successfully!');
        console.log('Feedback sent');
      })
      .catch((error) => {
        console.log('Error in sending feedback: ', error);
      });
  };

  const openGoogleMaps = () => {
    // Open Google Maps with the provided location
    const location = 'Your Location';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Contact Us</Text>

      <Text style={styles.heading}>Locate Us</Text>
      <TouchableOpacity onPress={openGoogleMaps} style={styles.locationButton}>
      <Ionicons name="location-outline" size={24} color='#B67F60' />
        <Text style={styles.locationButtonText}>My Location</Text>
      </TouchableOpacity>

      <Text style={styles.description}>Free delivery on orders above Rs. 1000</Text>
      <Text style={styles.contactInfo}>
        <Ionicons name="call-outline" size={20} color='#F4BA7A' />
        +1 123-456-7890
      </Text>
      <Text style={styles.contactInfo}>
        <Ionicons name="mail-outline" size={20} color='#F4BA7A' />
        contact@example.com
      </Text>
      <Text style={styles.heading}>Feedback and Suggestions</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.messageInput}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity onPress={handleSubmission} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#B67F60'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the text horizontally
  },
  locationButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5, // Adjust the spacing between the icon and text
    textAlign: 'center',
  },
  description: {
    fontSize: 25,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: -20,
    marginTop: 5,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  messageInput: {
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top', // For Android
  },
  submitButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
    contactInfo: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    },
});

export default ContactUs;
