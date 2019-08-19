import * as firebase from 'firebase';

export default function Setup(){
    firebase.initializeApp({
    apiKey: "AIzaSyAL7A7EUXzRmx4T0dMD8DyMIvdGYV6T9zs",
    authDomain: "ai-gwap.firebaseapp.com",
    databaseURL: "https://ai-gwap.firebaseio.com",
    projectId: "ai-gwap",
    storageBucket: "ai-gwap.appspot.com",
    messagingSenderId: "423634020815",
    appId: "1:423634020815:web:7af899851f37ed5b"
});
}



