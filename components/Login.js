
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { ScrollView, Text, StyleSheet, TextInput, View, Pressable, Alert, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Login = ({ navigation, onLogin }) => {
  const [user, setuser] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const userRef = firebase.firestore().collection('user');
    const unsubscribe = userRef.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setuser(data);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        console.log('Logged in successfully!');
        navigation.navigate('JoinScreens');
      })
      .catch((error) => {
        console.log('Error logging in: ', error);
        Alert.alert(
          'Invalid Credentials',
          'Please enter a valid email and password by creating an account.',
          [
            {
              text: 'Ok',
              onPress: handleAlertOk,
            },
          ]
        );
      });
  };

  const handleAlertOk = () => {
    // Clear email and password fields
    setEmail('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>SignIn</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.regularText}>Don't have an account? SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#B67F60',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  eyeIconContainer: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#F4BA7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
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
});

export default Login;




