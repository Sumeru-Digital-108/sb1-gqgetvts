import { Observable } from '@nativescript/core';
import { SpeechRecognition } from '@nativescript/speech-recognition';

export class SpeechRecognitionService extends Observable {
  private speechRecognition: SpeechRecognition;

  constructor() {
    super();
    this.speechRecognition = new SpeechRecognition();
  }

  async requestPermission(): Promise<boolean> {
    try {
      const granted = await this.speechRecognition.requestPermission();
      return granted;
    } catch (error) {
      console.error('Speech recognition permission error:', error);
      return false;
    }
  }

  async startListening(language: string): Promise<void> {
    try {
      await this.speechRecognition.startListening({
        locale: language,
        onResult: (transcription: string) => {
          this.notify({
            eventName: 'transcription',
            object: this,
            data: transcription
          });
        },
        onError: (error: Error) => {
          console.error('Speech recognition error:', error);
          this.notify({
            eventName: 'error',
            object: this,
            data: error
          });
        }
      });
    } catch (error) {
      console.error('Start listening error:', error);
      throw error;
    }
  }

  stopListening(): void {
    this.speechRecognition.stopListening();
  }
}