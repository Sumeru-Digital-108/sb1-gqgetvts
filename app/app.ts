import { Application } from '@nativescript/core';
import { FirebaseService } from './services/firebase/firebase.service';

// Initialize Firebase
FirebaseService.getInstance();

Application.run({ moduleName: 'app-root' });