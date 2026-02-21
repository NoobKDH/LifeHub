import React from 'react';
import { ListTodo, Target, Calendar, StickyNote } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab, textSecondaryClass, hoverClass, cardBgClass, borderClass }) => {
  const tabs = [
    { id: 'todo', icon: ListTodo, label: '할 일' },
    { id: 'habits', icon: Target, label: '습관' },
    { id: 'schedule', icon: Calendar, label: '일정' },
    { id: 'notes', icon: StickyNote, label: '메모' }
  ];

  return (
    <div className={`${cardBgClass} rounded-lg shadow-sm mb-6`}>
      <div className={`flex border-b ${borderClass}`}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : `${textSecondaryClass} ${hoverClass}`
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon size={20} />
                <span>{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;