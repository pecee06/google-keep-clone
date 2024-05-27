import {
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    query,
    where
} from "firebase/firestore"
import {db} from "../config/firebase.config"

class DB{
    async insert({collectionName, data}){
        try {
            const collectionRef = collection(db, collectionName)
            const res = await addDoc(collectionRef, data)
            return res
        } catch (err) {
            throw err
        }
    }

    async fetchData({collectionName, userId}){
        try {
            const collectionRef = collection(db, collectionName)
            const q = query(collectionRef, where("userId", "==", userId))
            const res = await getDocs(q)
            const data = res.docs.map(doc => {
                const obj = {
                    ...doc.data(),
                    id: doc.id
                }
                return obj
            })
            return data
        } catch (err) {
            throw err
        }
    }

    async delete({collectionName, id}){
        try {
            const docRef = doc(db, collectionName, id)
            const res = await deleteDoc(docRef)
            return res
        } catch (err) {
            throw err
        }
    }

    async update({collectionName, id, changes={}}){
        try {
            const docRef = doc(db, collectionName, id)
            const res = await updateDoc(docRef, changes)
            return res
        } catch (err) {
            throw err
        }
    }
}

const dbService = new DB
export default dbService