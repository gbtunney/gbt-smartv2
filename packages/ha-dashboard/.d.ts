interface CustomEnv {
  NODE_ENV: 'development' | 'production';
  VITE_HA_URL: string;
  VITE_FOLDER_NAME: string;
  VITE_SSH_USERNAME: string;
  VITE_SSH_PASSWORD?: string;
  VITE_SSH_HOSTNAME: string;
  VITE_HA_TOKEN: string;
  VITE_PRIVATE_KEY: string;
  VITE_PASSPHRASE: string;
  [key: string]: unknown;
}

// For Vite's import.meta.env
interface ImportMeta {
  env: CustomEnv;
}

// For Node's process.env
declare global {
  namespace NodeJS {
  }
}
