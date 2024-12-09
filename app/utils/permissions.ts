import { Application, AndroidApplication } from '@nativescript/core';

export async function requestPermission(permissionType: string): Promise<boolean> {
  if (Application.android) {
    const permissions = require('@nativescript/core/permissions');
    try {
      const result = await permissions.requestPermission(permissionType);
      return result === 'granted';
    } catch (error) {
      console.error(`Permission request error: ${error}`);
      return false;
    }
  }
  return true;
}