import firebase from "firebase/app"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyD9Zb_cRjacpx2YWD1zv0dbURi0uFitgSI",
    authDomain: "process-60467.firebaseapp.com",
    projectId: "process-60467",
    storageBucket: "process-60467.appspot.com",
    messagingSenderId: "709574451384",
    appId: "1:709574451384:web:3324e71d62840ce30d144d",
    measurementId: "G-XNZQBF3P9C"
}

firebase.initializeApp(config)

const db = firebase.firestore()

const dataRef = db.collection('data')

const notesRef = db.collection('notes')

export {dataRef, notesRef}