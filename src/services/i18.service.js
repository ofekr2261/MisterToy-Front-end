import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import translationEN from '../data/en.json' // English translations
import translationHE from '../data/he.json' // Hebrew translations

// Configure i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    he: {
      translation: translationHE,
    },
  },
  lng: 'en', // Set the default language here
  fallbackLng: 'en', // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes the values
  },
})

export default i18n
