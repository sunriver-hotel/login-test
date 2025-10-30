
import React from 'react';
import type { Language } from '../types';
import { translations } from '../constants';

interface SuccessPageProps {
  onLogout: () => void;
  language: Language;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onLogout, language }) => {
  const t = translations[language];

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center m-4">
      <svg className="mx-auto h-16 w-16 text-pastel-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl font-bold text-text-dark">{t.loginSuccess}</h1>
      <p className="text-text-light">
        This is where the main hotel management application would be displayed.
      </p>
      <button
        onClick={onLogout}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-yellow hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow transition-all duration-300"
      >
        {t.logoutButton}
      </button>
    </div>
  );
};

export default SuccessPage;
