import { Observable } from '@nativescript/core';
import axios from 'axios';

export class TranslationService extends Observable {
  private API_KEY = 'YOUR_TRANSLATION_API_KEY';
  private API_URL = 'https://translation-api.example.com';

  async translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    try {
      const response = await axios.post(`${this.API_URL}/translate`, {
        text,
        source: sourceLang,
        target: targetLang,
        api_key: this.API_KEY
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async translateSpeech(audioBuffer: ArrayBuffer, sourceLang: string, targetLang: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('audio', new Blob([audioBuffer]));
      formData.append('source', sourceLang);
      formData.append('target', targetLang);

      const response = await axios.post(`${this.API_URL}/speech-translate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.API_KEY}`
        }
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Speech translation error:', error);
      throw error;
    }
  }
}