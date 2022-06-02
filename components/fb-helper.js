import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";