import {auth} from "../config/firebase.config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"

class Auth{
    getCurrentUser(){
        return auth.currentUser
    }
    async signup({email, password}){
        try {
            const res =  await createUserWithEmailAndPassword(auth, email, password)
            if (res){
                const response = await signInWithEmailAndPassword(auth, email, password)
                return response
            }
            return res
        } catch (err) {
            throw err
        }
    }
    async login({email, password}){
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            throw err
        }
    }
    async logout(){
        try {
            return await signOut(auth)
        } catch (err) {
            throw err
        }
    }
}

const authService = new Auth()

export default authService