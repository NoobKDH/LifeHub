import React from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, textClass, textSecondaryClass, cardBgClass, hoverClass }) => {
  return (
    <div className={`${cardBgClass} rounded-lg shadow-sm p-6 mb-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${textClass}`}>LifeHub</h1>
          <p className={`${textSecondaryClass} mt-1`}>생산성 향상을 위한 올인원 대시보드</p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${hoverClass} transition-colors`}
          title={darkMode ? '라이트 모드' : '다크 모드'}
        >
          {darkMode ? (
            <Sun className="text-yellow-400" size={24} />
          ) : (
            <Moon className={textSecondaryClass} size={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;