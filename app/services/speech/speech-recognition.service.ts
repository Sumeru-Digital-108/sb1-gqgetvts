import { SpeechRecognition } from '@nativescript/speech-recognition';
import { BaseService } from '../base/base.service';
import { requestPermission } from '../../utils/permissions';

export class SpeechRecognitionService extends BaseService {
  private speechRecognition: SpeechRecognition;

  constructor() {
    super();
    this.speechRecognition = new SpeechRecognition();
  }

  async requestPermission(): Promise<boolean> {
    try {
      return await requestPermission('android.permission.RECORD_AUDIO');
    } catch (error) {
      this.handleServiceError(error as Error, 'requestPermission');
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
          this.handleServiceError(error, 'startListening.onError');
        }
      });
    } catch (error) {
      this.handleServiceError(error as Error, 'startListening');
      throw error;
    }
  }

  stopListening(): void {
    this.speechRecognition.stopListening();
  }
}