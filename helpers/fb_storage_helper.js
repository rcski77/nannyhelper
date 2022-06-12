import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./fb_creds";

export function initDB() {
  initializeApp(firebaseConfig);
}
