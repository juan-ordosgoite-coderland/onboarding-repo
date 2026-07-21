'use client';

import React from 'react';
import * as configcat from 'configcat-react';

export interface ConfigCatUser {
  identifier: string;
  email?: string;
  country?: string;
  custom?: Record<string, string | number | boolean>;
}

interface ConfigCatProviderProps {
  children: React.ReactNode;
  sdkKey: string;
  user?: ConfigCatUser;
}

const InternalProvider = (configcat.ConfigCatProvider as unknown) as React.FC<any>;

export function ConfigCatProvider({ children, sdkKey, user }: ConfigCatProviderProps) {
  return (
    <InternalProvider sdkKey={sdkKey} user={user} userObject={user}>
      {children}
    </InternalProvider>
  );
}

export function useBooleanFlag(flagKey: string, defaultValue = false, user?: ConfigCatUser): boolean {
  const { value } = configcat.useFeatureFlag(flagKey, defaultValue, user as any);
  return typeof value === 'boolean' ? value : defaultValue;
}

export function useStringFlag(flagKey: string, defaultValue = '', user?: ConfigCatUser): string {
  const { value } = configcat.useFeatureFlag(flagKey, defaultValue, user as any);
  return typeof value === 'string' ? value : String(defaultValue);
}

export function useNumberFlag(flagKey: string, defaultValue = 0, user?: ConfigCatUser): number {
  const { value } = configcat.useFeatureFlag(flagKey, defaultValue, user as any);
  return typeof value === 'number' ? value : Number(defaultValue);
}