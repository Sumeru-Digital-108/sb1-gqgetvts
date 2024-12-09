import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import '@nativescript/firebase-firestore';
import '@nativescript/firebase-storage';

export class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {
    this.initializeFirebase();
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  private async initializeFirebase() {
    try {
      await firebase.initializeApp();
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }

  get auth() {
    return firebase.auth();
  }

  get firestore() {
    return firebase.firestore();
  }

  get storage() {
    return firebase.storage();
  }
}