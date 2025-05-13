/**
 * Environment variable validation to ensure all required variables are present
 */

type EnvVar = {
  name: string;
  required: boolean;
  secret?: boolean; // Mark if this is a sensitive variable (for logging purposes)
};

// Define all environment variables used by the application
const ENV_VARS: EnvVar[] = [
  { name: 'NEXT_PUBLIC_SUPABASE_URL', required: true },
  { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', required: true },
  { name: 'SUPABASE_URL', required: true },
  { name: 'SUPABASE_ANON_KEY', required: true },
  { name: 'SUPABASE_SERVICE_ROLE_KEY', required: true, secret: true },
  { name: 'POSTGRES_URL', required: true, secret: true },
  { name: 'POSTGRES_PRISMA_URL', required: true, secret: true },
  { name: 'JWT_SECRET', required: true, secret: true },
  { name: 'NEXT_PUBLIC_APP_URL', required: true },
  { name: 'OPENAI_API_KEY', required: false, secret: true },
  { name: 'GROQ_API_KEY', required: false, secret: true },
  { name: 'GOOGLE_CLIENT_ID', required: false },
  { name: 'GOOGLE_CLIENT_SECRET', required: false, secret: true },
];

/**
 * Validates that all required environment variables are present
 * @returns An object with validation results
 */
export function validateEnv() {
  const missing: string[] = [];
  const present: string[] = [];

  ENV_VARS.forEach(({ name, required }) => {
    if (required && !process.env[name]) {
      missing.push(name);
    } else if (process.env[name]) {
      present.push(name);
    }
  });

  const isValid = missing.length === 0;

  if (!isValid) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
  } else {
    console.log(`Environment validation passed. ${present.length} variables loaded.`);
  }

  return { isValid, missing, present };
}

/**
 * Gets an environment variable, with type safety and validation
 * @param name The name of the environment variable
 * @param required Whether the variable is required
 * @returns The value of the environment variable, or undefined if not present
 */
export function getEnv(name: string, required = false): string | undefined {
  const value = process.env[name];
  
  if (required && !value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  
  return value;
}

/**
 * Gets a required environment variable, with type safety
 * @param name The name of the environment variable
 * @returns The value of the environment variable
 * @throws If the variable is not present
 */
export function getRequiredEnv(name: string): string {
  const value = getEnv(name, true);
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
}

// Validate environment variables at module load time in non-production environments
if (process.env.NODE_ENV !== 'production') {
  validateEnv();
}