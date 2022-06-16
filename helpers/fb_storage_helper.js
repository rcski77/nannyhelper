import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./fb_creds";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function initDB() {
  initializeApp(firebaseConfig);
  console.log("SUCCESS");
}

export async function upload(fileURI, id, setLoading, setImageURI) {
  console.log("FLAG 0");
  const storageFB = getStorage();

  console.log("FLAG 1");
  const uriName = "profiles/profile-pic-" + id + ".jpg";
  const fileRef = ref(storageFB, uriName);

  console.log("FLAG 2");
  // A) convert image to bytes. Potential Key to avoiding transferring image binary from one screen to another as commented in profile settings
  // A1) access image from image uri
  const image = await fetch(fileURI);

  console.log("FLAG 3");
  // A2) convert image into an array of bytes, or blob object
  const bytes = await image.blob();

  console.log("FLAG 4");
  // Toggle on loading flag (use State) to enable Buttons
  setLoading(true);

  console.log("FLAG 5");
  //Uploads image onto firebase
  const snapshot = await uploadBytes(fileRef, bytes);

  console.log("FLAG 6");
  // Gets imageURL uploaded on firebase
  const photoURL = await getDownloadURL(fileRef);

  console.log("FLAG 7");
  //Set new imageURI based on Firebase Location
  setImageURI(photoURL);

  console.log("FLAG 8");
  // Toggle on loading flag (use State) to disable Buttons
  setLoading(false);

  console.log("FLAG 9");
  //Notify upload is complete
  alert("File Uploaded!");
  console.log(photoURL);
}
