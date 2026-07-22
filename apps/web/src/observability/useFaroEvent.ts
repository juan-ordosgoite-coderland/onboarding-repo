'use client';

import { faro, LogLevel } from '@grafana/faro-web-sdk';

export function useFaroEvent() {
  const pushEvent = (name: string, attributes?: Record<string, string>) => {
    if (typeof window !== 'undefined' && faro?.api) {
      faro.api.pushEvent(name, attributes, undefined, { skipDedupe: true });
    }
  };

  const pushError = (error: Error, context?: Record<string, string>) => {
    if (typeof window !== 'undefined' && faro?.api) {
      faro.api.pushError(error, { skipDedupe: true, context });
    }
  };

  const pushLog = (message: string, level: LogLevel = LogLevel.INFO, context?: Record<string, string>) => {
    if (typeof window !== 'undefined' && faro?.api) {
      faro.api.pushLog([message], { level, skipDedupe: true, context });
    }
  };

  return { pushEvent, pushError, pushLog };
}