import { Observable } from '@nativescript/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

export class EventDetailsViewModel extends Observable {
  private eventService: EventService;
  private _event: Event;
  private _availableTranslations: { language: string }[] = [];

  constructor(eventId: string) {
    super();
    this.eventService = new EventService();
    this.loadEvent(eventId);
  }

  async loadEvent(eventId: string) {
    try {
      const event = await this.eventService.getEventById(eventId);
      this._event = event;
      this._availableTranslations = event.availableLanguages.map(lang => ({ language: lang }));
      
      this.notifyPropertyChange('event', this._event);
      this.notifyPropertyChange('availableTranslations', this._availableTranslations);
    } catch (error) {
      console.error('Failed to load event details:', error);
    }
  }

  async onViewTranslation(args: any) {
    const translation = args.object.bindingContext;
    const translatedText = await this.eventService.getEventTranslations(
      this._event.id,
      translation.language
    );
    
    // Navigate to translation view
    const frame = args.object.page.frame;
    frame.navigate({
      moduleName: 'components/translation-view/translation-view-page',
      context: {
        translation: translatedText,
        language: translation.language,
        eventTitle: this._event.title
      }
    });
  }

  onSubmitFeedback(args: any) {
    const frame = args.object.page.frame;
    frame.navigate({
      moduleName: 'components/feedback/feedback-page',
      context: { eventId: this._event.id }
    });
  }

  get event(): Event {
    return this._event;
  }

  get availableTranslations(): { language: string }[] {
    return this._availableTranslations;
  }
}