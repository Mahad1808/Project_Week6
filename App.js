// import React from 'react';
// import { View, Image, StyleSheet,  Alert } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useState, useEffect } from 'react';

// import Home from './components/Home';
// import OrderScreen from './components/OrderScreen';
// import ViewCart from './components/ViewCart';
// import ContactUs from './components/ContactUs';
// import Login from './components/Login';
// import WelcomeScreen from './components/WelcomeScreen';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   const [showWelcome, setShowWelcome] = useState(true);
  

//   // const handleOrderScreenPress = () => {
//   //   Alert.alert('Sign In Required', 'Please sign in to place an order.');
//   // };

//   useEffect(() => {
//     setTimeout(() => {
//       setShowWelcome(false);
//     }, 3000); // Change the timeout duration as per your requirement
//   }, []);

//   if (showWelcome) {
//     return <WelcomeScreen />;
//   }
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Order') {
//               iconName = focused ? 'basket' : 'basket-outline';
//             } else if (route.name === 'ViewCart') {
//               iconName = focused ? 'cart' : 'cart-outline';
//             } else if (route.name === 'Contact Us') {
//               iconName = focused ? 'call' : 'call-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }

//             // Return the Ionicons component with the appropriate icon name
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#F4BA7A',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Order" component={OrderScreen} />
//         <Tab.Screen name="ViewCart" component={ViewCart} />
//         <Tab.Screen name="Contact Us" component={ContactUs} />
//         <Tab.Screen name="Profile" component={Login} options={{ unmountOnBlur: true }}/>
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#B67F60',
//   },
// });

// import React, { useState } from 'react';
// import { View, Image, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useEffect } from 'react';

// import Login from './components/Login';
// import Home from './components/Home';
// import OrderScreen from './components/OrderScreen';
// import ViewCart from './components/ViewCart';
// import ContactUs from './components/ContactUs';
// import WelcomeScreen from './components/WelcomeScreen';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setShowWelcome(false);
//     }, 3000); // Change the timeout duration as per your requirement
//   }, []);

//   if (showWelcome) {
//     return <WelcomeScreen />;
//   }

//   const handleLoggedIn = () => {
//     setLoggedIn(true);
//   };

//   if (!loggedIn) {
//     return <Login setLoggedIn={handleLoggedIn} />;
//   }
  
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Order') {
//               iconName = focused ? 'basket' : 'basket-outline';
//             } else if (route.name === 'ViewCart') {
//               iconName = focused ? 'cart' : 'cart-outline';
//             } else if (route.name === 'Contact Us') {
//               iconName = focused ? 'call' : 'call-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }

//             // Return the Ionicons component with the appropriate icon name
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#F4BA7A',
//           inactiveTintColor: 'gray',
//         }}
//       >
        
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Order" component={OrderScreen} />
//         <Tab.Screen name="ViewCart" component={ViewCart} />
//         <Tab.Screen name="Contact Us" component={ContactUs} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#B67F60',
//   },
// });


import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Signup from './components/Signup';
import Login from './components/Login';
import ContactUs from './components/ContactUs';
import ViewCart from './components/ViewCart';
import OrderScreen from './components/OrderScreen';
import Home from './components/Home';
import WelcomeScreen from './components/WelcomeScreen';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#B67F60',
    background: 'white',
  },
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName =  'home' ;
          } else if (route.name === 'Order') {
            iconName = 'basket';
          } else if (route.name === 'ViewCart') {
            iconName = 'cart';
          } else if (route.name === 'Contact Us') {
            iconName = 'call';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          // Return the Ionicons component with the appropriate icon name
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="ViewCart" component={ViewCart} /> */}
      <Tab.Screen name="Contact Us" component={ContactUs} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <Login {...props} onLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="ViewCart" component={ViewCart} />
          <Stack.Screen name="Signup" component={Signup} /> 
          <Stack.Screen
            name="JoinScreens"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: '#B67F60',
  },
});
  