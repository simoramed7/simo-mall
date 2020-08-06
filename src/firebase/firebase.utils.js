import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAZx5jSC6jiGiS_V7JLvpOhrTcU79iBJow",
    authDomain: "simo-mall-db.firebaseapp.com",
    databaseURL: "https://simo-mall-db.firebaseio.com",
    projectId: "simo-mall-db",
    storageBucket: "simo-mall-db.appspot.com",
    messagingSenderId: "1042277001535",
    appId: "1:1042277001535:web:c30b5cc6f4cabd21cc0b8a",
    measurementId: "G-XBSG9W87N5"
  };

  export const createUserProfileDocument = async(userAuth, additionnalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
      const{displayName,email}=userAuth;
      const createdAt = new Date();
      try{
        userRef.set({
          displayName,
          email,
          createdAt,
          ...additionnalData
        })

      } catch(error){ console.log('error creating user',error.message);}
      
    }
    return userRef;
    };

    // This part of code was added to download data_shop to firebase, once done we remove it 
    //export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
      //const collectionRef = firestore.collection(collectionKey);
     // const batch = firestore.batch();
      //objectsToAdd.forEach(obj => {
       // const newDocRef = collectionRef.doc();
       // batch.set(newDocRef,obj);
     // });
     // return await batch.commit();
    //};

  firebase.initializeApp(config);
  
  export const convertCollectionsSnapShotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
     const { title,items }= doc.data();
     return {
       routeName : encodeURI(title.toLowerCase()),
       id : doc.id,
       title,
       items
     }; 
    })
    return transformedCollection.reduce((accumulator,collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{} )
  };
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;