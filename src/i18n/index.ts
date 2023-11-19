import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

i18n.use(Backend)
    .use(detector)
    .use(initReactI18next)
    .init({
        lng: 'ko', //預設語言
        supportedLngs: ['ko', 'en', 'tw', 'cn'],
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        ns: ['content', 'admin', 'evo', 'pp'],
        defaultNS: 'content',
        fallbackLng: ['en'], // 若當前語言沒有對應的翻譯則使用這個語言
    });

export default i18n;
