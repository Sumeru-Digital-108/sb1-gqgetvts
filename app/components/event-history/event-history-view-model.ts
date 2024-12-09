import { Observable } from '@nativescript/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

export class EventHistoryViewModel extends Observable {
  private eventService: EventService;
  private _events: Event[] = [];

  constructor() {
    super();
    this.eventService = new EventService();
    this.loadEvents();
  }

  async loadEvents() {
    try {
      this._events = await this.eventService.getEventHistory();
      this.notifyPropertyChange('events', this._events);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  }

  async onEventTap(args: any) {
    const event = args.object.bindingContext as Event;
    // Navigate to event details page
    const frame = args.object.page.frame;
    frame.navigate({
      moduleName: 'components/event-details/event-details-page',
      context: { eventId: event.id }
    });
  }

  get events(): Event[] {
    return this._events;
  }
}