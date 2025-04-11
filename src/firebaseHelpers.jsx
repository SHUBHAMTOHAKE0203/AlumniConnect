// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { ref, set, get, child, push, onValue } from 'firebase/database';
// import { db, app } from './firebase';

// const auth = getAuth(app);

// // -------------------- AUTH + USER (Realtime DB) --------------------

// export const signInUser = async (email, password) => {
//   return await signInWithEmailAndPassword(auth, email, password);
// };

// export const registerUser = async (email, password, userData) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   const userId = userCredential.user.uid;

//   const locationResponse = await fetch('https://ipapi.co/json/');
//   const locationData = await locationResponse.json();

//   const fullUserData = {
//     ...userData,
//     location: {
//       city: locationData.city,
//       country: locationData.country_name,
//       latitude: locationData.latitude,
//       longitude: locationData.longitude,
//     },
//     createdAt: Date.now()
//   };

//   await set(ref(db, `alumni/${userId}`), fullUserData);
//   return userCredential;
// };

// export const fetchUserData = async (userId) => {
//   const snapshot = await get(child(ref(db), `alumni/${userId}`));
//   if (snapshot.exists()) {
//     return snapshot.val();
//   } else {
//     throw new Error("No user data found");
//   }
// };

// export const fetchAllAlumni = async () => {
//   const snapshot = await get(ref(db, `alumni`));
//   if (snapshot.exists()) return snapshot.val();
//   else throw new Error("No alumni found");
// };

// export const logOutUser = async () => {
//   await signOut(auth);
// };

// // -------------------- CHAT (Realtime DB) --------------------

// export const sendMessage = async (uid, name, message) => {
//   const messageRef = ref(db, 'messages');
//   const newMessage = {
//     uid,
//     name,
//     text: message,
//     timestamp: Date.now(),
//   };
//   await push(messageRef, newMessage);
// };

// export const listenForMessages = (callback) => {
//   const messageRef = ref(db, 'messages');
//   onValue(messageRef, (snapshot) => {
//     const messages = [];
//     snapshot.forEach((childSnapshot) => {
//       messages.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val(),
//       });
//     });
//     callback(messages);
//   });
// };


import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, app } from './firebase';

const auth = getAuth(app);
const storage = getStorage(app);

export const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;

  await set(ref(db, `alumni/${userId}`), userData);
  return userCredential;
};

export const fetchUserData = async (userId) => {
  const snapshot = await get(child(ref(db), `alumni/${userId}`));
  if (snapshot.exists()) return snapshot.val();
  else throw new Error("No user data found");
};

export const fetchAllAlumni = async () => {
  const snapshot = await get(ref(db, `alumni`));
  if (snapshot.exists()) return snapshot.val();
  else throw new Error("No alumni found");
};

export const logOutUser = async () => {
  await signOut(auth);
};

export const uploadProfilePicture = async (file, userId) => {
  const fileRef = storageRef(storage, `profilePictures/${userId}`);
  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};
