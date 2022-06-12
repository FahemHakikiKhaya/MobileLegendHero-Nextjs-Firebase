import { useState } from "react";

import { app, database, storage } from "../../config/firebase";
import {
  collection,
  doc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteField,
} from "firebase/storage";
import Compare from "./compare";

export const UpdateData = async (value, rawData) => {
  const { roles, name, image, lanes, price } = value;
  const { heroId, rolesId, lanesId } = rawData;
  const newRoles = roles;
  const newLanes = lanes;
  const oldRoles = rolesId;
  const oldLanes = lanesId;

  const { deletedLanes, deletedRoles, addedLanes, addedRoles } = Compare(
    newRoles,
    newLanes,
    oldRoles,
    oldLanes
  );
  const addDataToArrayFireStore = async (array, document) => {
    array.map(async (value) => {
      const ref = doc(database, document, value);
      await updateDoc(ref, {
        heroId: arrayUnion(heroId),
      });
    });
  };
  const deleteDataOnArrayFireStore = async (array, document) => {
    array.map(async (value) => {
      const ref = doc(database, document, value);
      await updateDoc(ref, {
        heroId: arrayRemove(heroId),
      });
    });
  };
  if (image) {
    const storageRef = ref(storage, `heroImage/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = await updateDoc(doc(database, "Hero", heroId), {
            name: name,
            price: price,
            image: downloadURL,
            lanesId: lanes,
            rolesId: roles,
          });

          if (addedLanes.length) {
            await addDataToArrayFireStore(addedLanes, "Lanes");
          }
          if (addedRoles.length) {
            await addDataToArrayFireStore(addedRoles, "Roles");
          }
          if (deletedLanes.length) {
            await deleteDataOnArrayFireStore(deletedLanes, "Lanes");
          }
          if (deletedRoles.length) {
            await deleteDataOnArrayFireStore(deletedRoles, "Roles");
          }
        });
      }
    );
  }
  if (!image) {
    const docRef = await updateDoc(doc(database, "Hero", heroId), {
      name: name,
      price: price,
      lanesId: lanes,
      rolesId: roles,
    });
    if (addedLanes.length) {
      await addDataToArrayFireStore(addedLanes, "Lanes");
    }
    if (addedRoles.length) {
      await addDataToArrayFireStore(addedRoles, "Roles");
    }
    if (deletedLanes.length) {
      await deleteDataOnArrayFireStore(deletedLanes, "Lanes");
    }
    if (deletedRoles.length) {
      await deleteDataOnArrayFireStore(deletedRoles, "Roles");
    }
  }
  return true;
};
