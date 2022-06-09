import { useState } from "react";

import { app, database, storage } from "../../config/firebase";
import {
  collection,
  addDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const UploadData = async (data) => {
  const image = data.image;
  var uploadedImageUrl = "";

  const storageRef = ref(storage, `heroImage/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const docRef = await addDoc(collection(database, "Hero"), {
          name: data.name,
          price: data.price,
          image: downloadURL,
          lanesId: data.lanes,
          rolesId: data.roles,
        });
        const heroId = docRef.id;
        data.lanes.map(async (value) => {
          const lanesRef = doc(database, "Lanes", value);
          await updateDoc(lanesRef, {
            heroId: arrayUnion(heroId),
          });
        });
        data.roles.map(async (value) => {
          const rolesRef = doc(database, "Roles", value);
          await updateDoc(rolesRef, {
            heroId: arrayUnion(heroId),
          });
        });
      });
    }
  );
  return true;
};
