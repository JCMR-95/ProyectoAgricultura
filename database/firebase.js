import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDobYJsdCgv-039mKExMCdiUpeDj8ekKDM",
  authDomain: "aplicacion-navgonz.firebaseapp.com",
  projectId: "aplicacion-navgonz",
  storageBucket: "aplicacion-navgonz.appspot.com",
  messagingSenderId: "655958913158",
  appId: "1:655958913158:web:70b641a26b765a134b6107"
};
// Initialize Firebase

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();

  export default {
      firebase,
      db
  }