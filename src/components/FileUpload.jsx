// File: FileUpload.jsx
import React from 'react';
import { ref as dbRef, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const FileUpload = ({ user }) => {
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const storageReference = storageRef(storage, `uploads/${user.uid}/${Date.now()}_${file.name}`);
    await uploadBytes(storageReference, file);
    const fileURL = await getDownloadURL(storageReference);

    const newMessage = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      content: fileURL,
      timestamp: Date.now(),
    };

    await push(dbRef(db, 'globalChat'), newMessage);
  };

  return (
    <div className="mt-2">
      <input type="file" onChange={uploadFile} />
    </div>
  );
};

export default FileUpload;
