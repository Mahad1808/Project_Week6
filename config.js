import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBRE_Fhfq-_R-sChPWiS7jehlU1tYmGj68",
    authDomain: "test-dedf4.firebaseapp.com",
    projectId: "test-dedf4",
    storageBucket: "test-dedf4.appspot.com",
    messagingSenderId: "553467727947",
    appId: "1:553467727947:web:99eb21d8123e7ee5a5bdce",
    measurementId: "G-TFRYJK820X"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};