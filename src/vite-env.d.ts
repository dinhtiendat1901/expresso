/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUPPETEER_SERVER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
