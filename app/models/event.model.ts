export interface Event {
  id: string;
  title: string;
  speakerName: string;
  sourceLanguage: string;
  availableLanguages: string[];
  startTime: Date;
  endTime: Date;
  isLive: boolean;
  description: string;
  translatedScripts?: { [language: string]: string };
}