import { Observable } from '@nativescript/core';
import { TranslationService } from '../../services/translation.service';
import { EventService } from '../../services/event.service';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { Event } from '../../models/event.model';

export class LiveEventViewModel extends Observable {
  private translationService: TranslationService;
  private eventService: EventService;
  private speechService: SpeechRecognitionService;
  private ttsService: TextToSpeechService;
  private _currentEvent: Event;
  private _liveTranslation: string = '';
  private _originalText: string = '';
  private _isListening: boolean = false;
  private _selectedLanguageIndex: number = 0;

  constructor() {
    super();
    this.translationService = new TranslationService();
    this.eventService = new EventService();
    this.speechService = new SpeechRecognitionService();
    this.ttsService = new TextToSpeechService();

    this.setupSpeechRecognition();
  }

  private setupSpeechRecognition() {
    this.speechService.on('transcription', async (args: any) => {
      this._originalText = args.data;
      this.notifyPropertyChange('originalText', this._originalText);

      const targetLanguage = this.currentEvent.availableLanguages[this._selectedLanguageIndex];
      const translation = await this.translationService.translateText(
        this._originalText,
        this.currentEvent.sourceLanguage,
        targetLanguage
      );

      this._liveTranslation = translation;
      this.notifyPropertyChange('liveTranslation', this._liveTranslation);

      // Speak the translation
      await this.ttsService.speak(translation, targetLanguage);
    });
  }

  async startTranslation() {
    const hasPermission = await this.speechService.requestPermission();
    if (!hasPermission) {
      console.error('Speech recognition permission denied');
      return;
    }

    this._isListening = true;
    this.notifyPropertyChange('isListening', true);
    
    await this.speechService.startListening(this.currentEvent.sourceLanguage);
  }

  stopTranslation() {
    this._isListening = false;
    this.notifyPropertyChange('isListening', false);
    
    this.speechService.stopListening();
    this.ttsService.stop();
  }

  toggleTranslation() {
    if (this.isListening) {
      this.stopTranslation();
    } else {
      this.startTranslation();
    }
  }

  async loadEvent(eventId: string) {
    const event = await this.eventService.getEventById(eventId);
    if (event) {
      this._currentEvent = event;
      this.notifyPropertyChange('currentEvent', this._currentEvent);
    }
  }

  // Getters
  get currentEvent(): Event {
    return this._currentEvent;
  }

  get liveTranslation(): string {
    return this._liveTranslation;
  }

  get originalText(): string {
    return this._originalText;
  }

  get isListening(): boolean {
    return this._isListening;
  }

  get selectedLanguageIndex(): number {
    return this._selectedLanguageIndex;
  }

  get availableLanguages(): string[] {
    return this._currentEvent?.availableLanguages || [];
  }
}