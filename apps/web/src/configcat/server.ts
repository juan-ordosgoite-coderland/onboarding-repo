import * as configcat from 'configcat-node';
import type { ConfigCatUser } from './index';

const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY || '';

let configCatServerClient: configcat.IConfigCatClient | null = null;

export function getSystemConfigCatClient() {
  if (!configCatServerClient && sdkKey) {
    configCatServerClient = configcat.getClient(sdkKey);
  }
  return configCatServerClient;
}

export async function getServerFeatureFlag<T extends configcat.SettingValue>(
  flagKey: string,
  defaultValue: T,
  user?: ConfigCatUser
): Promise<T> {
  const client = getSystemConfigCatClient();
  if (!client) return defaultValue;

  try {
    const configCatUser = user
      ? new configcat.User(
          user.identifier,
          user.email,
          user.country,
          user.custom as any
        )
      : undefined;

    const value = await client.getValueAsync(flagKey, defaultValue, configCatUser);
    return value as T;
  } catch (error) {
    console.error(`[ConfigCat SSR Error] Error fetching flag ${flagKey}:`, error);
    return defaultValue;
  }
}