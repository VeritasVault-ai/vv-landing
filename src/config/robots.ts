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

export function getRobotsConfig(): RobotsConfig {
  const base = configs[ENV] ?? configs.production;
  return {
    ...base,
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    env: ENV,
  };
}
