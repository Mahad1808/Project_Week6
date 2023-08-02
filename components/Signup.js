
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { ScrollView, Text, StyleSheet, TextInput, Pressable, Image, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
    // Validate mandatory fields
    if (!name || !email || !address || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Validate password
    if (password.length < 6 || !/[a-zA-Z0-9!@#$%^&*()_+]/.test(password)) {
      Alert.alert(
        'Error',
        'Password must be at least 6 characters long and contain special characters or alphabets.'
      );
      return;
    }

    firebase
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods && signInMethods.length > 0) {
          Alert.alert('Error', 'Email is already in use. Please use a different email.');
        } else {
          // Perform signup logic here
          console.log('Signup button pressed');
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              const userId = userCredential.user.uid;
              const userRef = firebase.firestore().collection('user');
              userRef
                .doc(userId)
                .set({
                  name: name,
                  email: email,
                  address: address,
                  phoneNumber: phoneNumber,
                  password: password,
                  confirmPassword: confirmPassword,
                })
                .then(() => {
                  setName('');
                  setEmail('');
                  setAddress('');
                  setPhoneNumber('');
                  setPassword('');
                  setConfirmPassword('');
                  console.log('Signed up successfully!');
                  navigation.navigate('Login'); // Navigate to the login screen
                })
                .catch((error) => {
                  console.log('Error signing up: ', error);
                });
            })
            .catch((error) => {
              setError('Email is already in use. Please use a different email.');
              console.log('Error creating user: ', error);
            });
        }
      })
      .catch((error) => {
        setError('Error checking email availability: ', error);
        console.log('Error checking email availability: ', error);
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Register Here</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address (abc@gmail.com)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number (+92-222-1234567)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

<View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password (!@`~#$%^&*()_+1235ascag)"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={18} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Re-enter Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIconContainer}>
          <FontAwesome5 name={showConfirmPassword ? 'eye' : 'eye-slash'} size={18} color="black" />
        </TouchableOpacity>
      </View>
        
      
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.regularText}>Already have an account? Log in</Text>
        </Pressable>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B67F60',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    height: 40,
    flex: 1,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  signupButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  regularText: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  eyeIconContainer: {
    padding: 10,
  },
});

export default Signup;


