// src/config/robots.ts
import type { MetadataRoute } from 'next';

type Env = 'production' | 'staging' | 'development';
const ENV = (process.env.NEXT_PUBLIC_ENV ?? process.env.NODE_ENV) as Env;

interface RobotsConfig extends MetadataRoute.Robots {
  env: Env;
}

const configs: Record<Env, MetadataRoute.Robots> = {
  production: {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
  },
  staging: {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/','/secret/'] },
  },
  development: {
    rules: { userAgent: '*', allow: '/', disallow: ['/'] },
  },
};

/**
 * Returns the robots.txt configuration for the current environment.
 *
 * Selects environment-specific rules and constructs the sitemap URL using the `NEXT_PUBLIC_APP_URL` environment variable if available.
 *
 * @returns The robots configuration object for the current environment, including rules, sitemap URL, and environment identifier.
 *
 * @remark If `NEXT_PUBLIC_APP_URL` is not defined, the sitemap URL will be omitted.
 */
export function getRobotsConfig(): RobotsConfig {
  const base = configs[ENV] ?? configs.production;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    console.warn('NEXT_PUBLIC_APP_URL is not defined. Sitemap URL may be incorrect.');
  }

  return {
    ...base,
    sitemap: appUrl ? `${appUrl}/sitemap.xml` : undefined,
    env: ENV,
  };
}
