import { TextToSpeech } from '@nativescript/text-to-speech';
import { BaseService } from '../base/base.service';

export class TextToSpeechService extends BaseService {
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
      this.handleServiceError(error as Error, 'speak');
      throw error;
    }
  }

  stop(): void {
    this.tts.pause();
  }
}