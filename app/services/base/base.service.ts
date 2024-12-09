import { Observable } from '@nativescript/core';
import { handleError } from '../../utils/error-handler';

export class BaseService extends Observable {
  protected handleServiceError(error: Error, methodName: string): void {
    handleError(error, `${this.constructor.name}.${methodName}`);
  }
}