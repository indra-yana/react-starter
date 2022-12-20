import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import i18n from 'i18next';
import id from './id/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

export const LANG = {
    en: { nativeName: 'EN' },
    id: { nativeName: 'ID' }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        initImmediate: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: en,
            },
            id: {
                translation: id,
            }
        },
    });

export default i18n;