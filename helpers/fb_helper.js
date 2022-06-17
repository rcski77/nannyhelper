// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, push, remove } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./fb_creds";

export function initDB() {
  initializeApp(firebaseConfig);
}

export function initAnalytics(app) {
  getAnalytics(app);
}

export function storeScheduleSlot(item) {
  const db = getDatabase();

  push(reference, item);
}

export function setupScheduleListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "scheduleData/");
  onValue(reference, (snapshot) => {
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}

export function updateSchedule(item) {
  const db = getDatabase();
  console.log(item);
  if (item.id) {
    const key = item.id;
    delete item.id;
    const reference = ref(db, `scheduleData/${key}`);
    set(reference, item);
  } else {
    const reference = ref(db, "scheduleData/");
    push(reference, item);
  }
}

export function deleteSchedule(item) {
  const db = getDatabase();
  const reference = ref(db, `reminderData/${item.id}`);
  remove(reference);
}

// Methods for Profile Settings Data
export function storeProfile(item) {
  const db = getDatabase();
  push(reference, item);
}

export function setupProfileListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "profileData/");
  onValue(reference, (snapshot) => {
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}

export function updateProfile(item) {
  const db = getDatabase();
  //console.log("from fb helper: ", item);
  if (item.id) {
    const key = item.id;
    delete item.id;
    const reference = ref(db, `profileData/${key}`);
    set(reference, item);
  } else {
    const reference = ref(db, "profileData/");
    push(reference, item);
  }
}
