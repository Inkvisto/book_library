import url from 'url'

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = (meta) =>url.fileURLToPath(new URL('.', meta.url));