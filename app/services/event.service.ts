import { Observable } from '@nativescript/core';
import { Event } from '../models/event.model';
import { firebase } from '@nativescript/firebase';

export class EventService extends Observable {
  async getLiveEvents(): Promise<Event[]> {
    const snapshot = await firebase.firestore
      .collection('events')
      .where('isLive', '==', true)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  }

  async getEventHistory(): Promise<Event[]> {
    const snapshot = await firebase.firestore
      .collection('events')
      .where('isLive', '==', false)
      .orderBy('startTime', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  }

  async getEventTranslations(eventId: string, language: string): Promise<string> {
    const doc = await firebase.firestore
      .collection('events')
      .doc(eventId)
      .get();
    
    const event = doc.data() as Event;
    return event.translatedScripts?.[language] || '';
  }
}