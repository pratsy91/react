import { useState } from 'react';

function ReactI18next() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">react-i18next</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding react-i18next</h3>
        <p className="text-blue-800 mb-2">
          react-i18next is a powerful internationalization (i18n) framework for React built on top of i18next. It provides a 
          complete solution for translating React applications into multiple languages, handling language switching, pluralization, 
          date/number formatting, and more. It's the most popular i18n solution for React applications.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Translation Management:</strong> Organize translations by language and namespace</li>
            <li><strong>Language Switching:</strong> Dynamically change language at runtime</li>
            <li><strong>Pluralization:</strong> Handle singular/plural forms correctly</li>
            <li><strong>Interpolation:</strong> Insert variables into translations</li>
            <li><strong>Formatting:</strong> Format dates, numbers, and currencies</li>
            <li><strong>Lazy Loading:</strong> Load translations on demand</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Complete i18n solution for React</li>
            <li>Large ecosystem and community</li>
            <li>TypeScript support</li>
            <li>Flexible translation loading (static, dynamic, lazy)</li>
            <li>Rich formatting options</li>
            <li>Works with SSR and Next.js</li>
          </ul>
          <p className="mt-2"><strong>When to Use react-i18next:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Applications targeting multiple languages</li>
            <li>When you need complex i18n features</li>
            <li>For applications with many translations</li>
            <li>When you need formatting (dates, numbers)</li>
            <li>For production applications requiring i18n</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete API</h3>
        <p className="text-gray-700 mb-4">
          react-i18next is a powerful internationalization framework for React.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install react-i18next i18next

// Setup
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome'
        }
      },
      fr: {
        translation: {
          welcome: 'Bienvenue'
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// useTranslation hook
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return <h1>{t('welcome')}</h1>;
}

// Change language
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  return (
    <button onClick={() => i18n.changeLanguage('fr')}>
      Français
    </button>
  );
}

// Translation with interpolation
const translation = {
  greeting: 'Hello {{name}}'
};

// Usage
{t('greeting', { name: 'John' })}

// Pluralization
const translation = {
  items: '{{count}} item',
  items_plural: '{{count}} items'
};

// Usage
{t('items', { count: 1 })} // "1 item"
{t('items', { count: 5 })} // "5 items"`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Translation Management</h3>
        <p className="text-gray-700 mb-4">
          Organize and manage translations effectively.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Translation files structure
// public/locales/en/translation.json
{
  "common": {
    "welcome": "Welcome",
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "home": {
    "title": "Home",
    "description": "Welcome to our website"
  }
}

// Namespaces
i18n.init({
  defaultNS: 'translation',
  ns: ['translation', 'common', 'home']
});

// Use namespace
const { t } = useTranslation('home');
t('title'); // From home namespace

// Multiple namespaces
const { t } = useTranslation(['translation', 'common']);
t('common:welcome');

// Translation loading
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

// Lazy loading translations
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YourApp />
    </Suspense>
  );
}

// Translation keys organization
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "forms": {
    "email": {
      "label": "Email",
      "placeholder": "Enter your email",
      "error": "Invalid email"
    }
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Language Switching</h3>
        <p className="text-gray-700 mb-4">
          Implement language switching functionality.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Language switcher component
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

// Detect browser language
i18n.init({
  lng: navigator.language.split('-')[0],
  fallbackLng: 'en'
});

// Persist language preference
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
};

// Load saved language
i18n.init({
  lng: localStorage.getItem('language') || 'en'
});

// Language detection plugin
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Pluralization</h3>
        <p className="text-gray-700 mb-4">
          Handle plural forms correctly in different languages.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Simple pluralization
// en/translation.json
{
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}

// Usage
{t('items', { count: 1 })} // "1 item"
{t('items', { count: 5 })} // "5 items"

// Complex pluralization (Russian example)
// ru/translation.json
{
  "items_zero": "Нет элементов",
  "items_one": "{{count}} элемент",
  "items_few": "{{count}} элемента",
  "items_many": "{{count}} элементов",
  "items_other": "{{count}} элементов"
}

// Pluralization rules
// Languages have different plural rules:
// - English: one, other
// - French: one, other
// - Russian: zero, one, few, many, other
// - Polish: one, few, many, other

// Using i18next pluralization
{
  "key": "item",
  "key_plural": "items"
}

// Context-based pluralization
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items",
  "items_context_male": "{{count}} male item",
  "items_context_female": "{{count}} female item"
}

// Usage with context
{t('items', { count: 1, context: 'male' })}

// Custom pluralization
i18n.services.pluralResolver.addRule('custom', {
  numbers: [1, 2, 3, 4, 5],
  plurals: (n) => {
    if (n === 1) return 0;
    if (n >= 2 && n <= 4) return 1;
    return 2;
  }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Formatting (Dates, Numbers)</h3>
        <p className="text-gray-700 mb-4">
          Format dates and numbers according to locale.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Date formatting
import { useTranslation } from 'react-i18next';

function DateComponent() {
  const { t, i18n } = useTranslation();
  
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat(i18n.language).format(date);
  
  return <div>{formattedDate}</div>;
}

// Number formatting
function NumberComponent() {
  const { i18n } = useTranslation();
  
  const number = 1234.56;
  const formatted = new Intl.NumberFormat(i18n.language).format(number);
  
  return <div>{formatted}</div>;
}

// Currency formatting
function CurrencyComponent() {
  const { i18n } = useTranslation();
  
  const amount = 1234.56;
  const currency = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
  
  return <div>{currency}</div>;
}

// Relative time formatting
import { formatRelative } from 'date-fns';
import { enUS, fr, es } from 'date-fns/locale';

const locales = { en: enUS, fr, es };

function RelativeTime({ date }) {
  const { i18n } = useTranslation();
  const locale = locales[i18n.language] || enUS;
  
  return formatRelative(date, new Date(), { locale });
}

// i18next formatting
i18n.init({
  interpolation: {
    format: (value, format, lng) => {
      if (format === 'date') {
        return new Intl.DateTimeFormat(lng).format(value);
      }
      if (format === 'number') {
        return new Intl.NumberFormat(lng).format(value);
      }
      return value;
    }
  }
});

// Usage
{t('date', { date: new Date(), formatParams: { date: { year: 'numeric', month: 'long' } } })}

// Custom formatters
i18n.services.formatter.add('uppercase', (value) => {
  return value.toUpperCase();
});

// Usage
{t('text', { text: 'hello', formatParams: { text: { format: 'uppercase' } } })}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ReactI18next;

