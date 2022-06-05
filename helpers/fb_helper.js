// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./fb_creds";

export function initDB() {
  initializeApp(firebaseConfig);
}
