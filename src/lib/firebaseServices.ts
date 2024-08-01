import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";


interface AddToFirestore{
    collectionName: string; 
    data: unknown;
}

export const addToFirestore = async ({collectionName, data}: AddToFirestore) => {
 try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef
 }catch(error){
    console.log(error);
 }
};

export const getAllFromFirestore = async (collectionName: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        console.log(querySnapshot);
        return querySnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.log(error);
      }
};