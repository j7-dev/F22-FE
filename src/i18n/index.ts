import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

i18n.use(Backend)
    .use(detector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ko', 'tw', 'cn'],
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        ns: ['content', 'admin'],
        defaultNS: 'content',
        fallbackLng: ['en', 'ko', 'tw', 'cn'], // 若當前語言沒有對應的翻譯則使用這個語言
    });

export default i18n;
