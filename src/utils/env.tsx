export const APP_NAME = import.meta.env.APP_NAME || 'F22 FE';
export const APP_NAME_KEBAB = APP_NAME.toLowerCase().replace(/\s+/g, '-');
export const APP_NAME_SNAKE = APP_NAME.toLowerCase().replace(/\s+/g, '_');
export const API_URL = import.meta.env.VITE_API_URL || '/';
export const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';
export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || '30000';
