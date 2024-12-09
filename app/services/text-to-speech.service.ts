import { Observable } from '@nativescript/core';
import { TextToSpeech } from '@nativescript/text-to-speech';

export class TextToSpeechService extends Observable {
  private tts: TextToSpeech;

  constructor() {
    super();
    this.tts = new TextToSpeech();
  }

  async speak(text: string, language: string): Promise<void> {
    try {
      await this.tts.speak({
        text,
        language,
        speakRate: 1.0,
        pitch: 1.0,
        volume: 1.0
      });
    } catch (error) {
      console.error('Text to speech error:', error);
      throw error;
    }
  }

  stop(): void {
    this.tts.pause();
  }
}