import { addDoc, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";


interface AddToFirestore{
    collectionName: string; 
    data: {
        name: string;
        quantity: number;
        id: string;
    };
}

export const addToFirestore = async ({collectionName, data}: AddToFirestore) => {
 try {
   
    const q = query(collection(db, collectionName), where("name", "==", data.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
    
      querySnapshot.forEach(async (document) => {
        const docRef = doc(db, collectionName, document.id);
        const updatedQuantity = document.data().quantity + data.quantity;
        await updateDoc(docRef, { quantity: updatedQuantity });
        console.log(`Document with ID ${document.id} updated with new quantity: ${updatedQuantity}`);
      });
    } else {
   
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    }
  } catch (error) {
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