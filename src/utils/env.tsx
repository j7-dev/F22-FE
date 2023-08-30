export const appName = import.meta.env.APP_NAME || 'F22 FE';
export const kebab = appName.toLowerCase().replace(/\s+/g, '-');
export const snake = appName.toLowerCase().replace(/\s+/g, '_');
export const apiUrl = import.meta.env.VITE_API_URL || ' ';
export const apiTimeout = import.meta.env.VITE_API_TIMEOUT || '30000';
