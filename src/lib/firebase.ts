import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  deleteDoc 
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { User } from '../types';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId
};

// Initialize Firebase App & Services
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Firestore Error Handler helper
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const ADMIN_USER_ID = 'S3XGP2Q58rYulbHQQ1yPgLQraGI3';

/**
 * Save or update user profile document in Firestore `/users/{userId}`
 */
export async function syncUserToFirestore(userData: User): Promise<void> {
  const path = `users/${userData.id}`;
  try {
    const userRef = doc(db, 'users', userData.id);
    await setDoc(userRef, {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: (userData.id === ADMIN_USER_ID || userData.email?.toLowerCase() === 'alex@skymedthailand.com') ? 'admin' : (userData.role || 'patient'),
      phone: userData.phone || '',
      emergencyContact: userData.emergencyContact || '',
      avatarUrl: userData.avatarUrl || '',
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Could not sync user to Firestore:', err);
  }
}

/**
 * Fetch all users from Firestore `/users`
 */
export async function fetchUsersFromFirestore(): Promise<User[]> {
  const path = 'users';
  try {
    const snap = await getDocs(collection(db, 'users'));
    const users: User[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      users.push({
        id: docSnap.id,
        email: data.email || '',
        name: data.name || 'Anonymous Patient',
        role: docSnap.id === ADMIN_USER_ID ? 'admin' : (data.role || 'patient'),
        phone: data.phone || '',
        emergencyContact: data.emergencyContact || '',
        avatarUrl: data.avatarUrl || '',
        createdAt: data.createdAt || new Date().toISOString()
      });
    });
    return users;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return [];
  }
}

/**
 * Upload a file directly to Firebase Storage
 */
export async function uploadToFirebaseStorage(file: File, folderPath: string = 'skymed-uploads'): Promise<{ url: string; fullPath: string }> {
  const fileExtension = file.name.split('.').pop() || 'jpg';
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  const storageRef = ref(storage, `${folderPath}/${fileName}`);
  
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  
  return {
    url: downloadUrl,
    fullPath: snapshot.ref.fullPath
  };
}

/**
 * Delete a file from Firebase Storage
 */
export async function deleteFromFirebaseStorage(fullPathOrUrl: string): Promise<void> {
  try {
    const storageRef = ref(storage, fullPathOrUrl);
    await deleteObject(storageRef);
  } catch (err) {
    console.warn('Could not delete file from Firebase storage:', err);
  }
}
