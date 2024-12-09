import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import '@nativescript/firebase-firestore';
import '@nativescript/firebase-storage';
import { firebaseConfig } from '../../config/firebase-config';
import { BaseService } from '../base/base.service';

export class FirebaseService extends BaseService {
  private static instance: FirebaseService;

  private constructor() {
    super();
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
      await firebase.initializeApp(firebaseConfig);
    } catch (error) {
      this.handleServiceError(error as Error, 'initializeFirebase');
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