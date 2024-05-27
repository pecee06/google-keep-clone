import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDxGyyEDb9DsRP3s1_CKToTvIj0sFG_D4o",
    authDomain: "keep-clone-81e96.firebaseapp.com",
    projectId: "keep-clone-81e96",
    storageBucket: "keep-clone-81e96.appspot.com",
    messagingSenderId: "753496664693",
    appId: "1:753496664693:web:1a9420a91b84acfcb5a63c"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Authorization
const auth = getAuth(app)

// CRUD operation
const db = getFirestore(app)

export {auth, db}