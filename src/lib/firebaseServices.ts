import { addDoc, collection, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid';
import { Update } from "next/dist/build/swc";

interface AddToFirestore{
    collectionName: string; 
    data: {
        name: string;
        quantity: number;
   
    };
}

interface UpdateExistingItem{
    collectionName: string; 
    data: {
        id: string;
        name: string;
        quantity: number;
   
    };
}


export const addToFirestore = async ({ collectionName, data }: AddToFirestore) => {
  try {
  
    const q = query(collection(db, collectionName), where("name", "==", data.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
     
      querySnapshot.forEach(async (document) => {
        const docRef = document.ref;
        const updatedQuantity = document.data().quantity + data.quantity;
        await updateDoc(docRef, { quantity: updatedQuantity });
        console.log(`Document with ID ${document.id} updated with new quantity: ${updatedQuantity}`);
      });
    } else {
      
      const docRef = await addDoc(collection(db, collectionName), {...data, id: uuidv4()});
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    }
  } catch (error) {
    console.error("Error adding to Firestore:", error);
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



export const updateExistingItemInFirestore = async ({ collectionName, data }: UpdateExistingItem) => {
  try {
    console.log(data)
    const q = query(collection(db, collectionName), where("id", "==", data.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        const docRef = document.ref;
     
        await updateDoc(docRef, { name: data.name, quantity: data.quantity });
        console.log(`Document with ID ${document.id} updated with new data: name: ${data.name}, quantity: ${data.quantity}`);
      });
    } 
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};


export const deleteExistingItemFromFirestore = async ({ collectionName, data }: UpdateExistingItem) => {
  try {
    const { id } = data;
    const q = query(collection(db, collectionName), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        const docRef = document.ref;
     
        await deleteDoc(docRef);
        console.log(`Document with ID ${document.id} deleted`);
      });
    } else {
      console.log(`No document found with id: ${id}`);
    }
  } catch (error) {
    console.error("Error deleting from Firestore:", error);
  }
};