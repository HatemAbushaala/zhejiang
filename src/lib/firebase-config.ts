import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6gQJdvFm6JRiw9xsojBkI7rc3imtFci4",
  authDomain: "zhejiang-3f63f.firebaseapp.com",
  projectId: "zhejiang-3f63f",
  storageBucket: "zhejiang-3f63f.firebasestorage.app",
  messagingSenderId: "666681045334",
  appId: "1:666681045334:web:9ef73df8ccee0b6d3966f7",
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
