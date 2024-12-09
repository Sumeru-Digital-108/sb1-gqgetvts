export interface TranslationFeedback {
  id: string;
  eventId: string;
  userId: string;
  originalText: string;
  translatedText: string;
  suggestedTranslation: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}