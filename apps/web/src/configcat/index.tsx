'use client';

import { ReactNode } from 'react';
import * as configcat from 'configcat-react';

interface ConfigCatProviderProps {
  children: ReactNode;
  sdkKey: string;
}

export function ConfigCatProvider({ children, sdkKey }: ConfigCatProviderProps) {
  return (
    <configcat.ConfigCatProvider sdkKey={sdkKey}>
      {children}
    </configcat.ConfigCatProvider>
  );
}

export function useBooleanFlag(flagKey: string, defaultValue = false): boolean {
  const { value } = configcat.useFeatureFlag(flagKey, defaultValue);
  return typeof value === 'boolean' ? value : defaultValue;
}

export function useStringFlag(flagKey: string, defaultValue = ''): string {
  const { value } = configcat.useFeatureFlag(flagKey, defaultValue);
  return typeof value === 'string' ? value : String(defaultValue);
}

export function useNumberFlag(flagKey: string, defaultValue = 0): number {
  const { value } = configcat.useFeatureFlag(flagKey, defaultValue);
  return typeof value === 'number' ? value : Number(defaultValue);
}