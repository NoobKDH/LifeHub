import React from 'react';
import { Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';

const HabitTab = ({ 
  habits, 
  newHabit, 
  setNewHabit, 
  addHabit, 
  toggleHabit, 
  deleteHabit,
  cardBgClass,
  textClass,
  textSecondaryClass,
  borderClass,
  hoverClass
}) => {
  const habitCompletionRate = habits.length > 0
    ? Math.round((habits.filter(h => h.checkedToday).length / habits.length) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* 습관 완료율 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${textSecondaryClass}`}>오늘의 습관 완료율</span>
          <span className="text-2xl font-bold text-green-600">{habitCompletionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${habitCompletionRate}%` }}
          />
        </div>
      </div>

      {/* 습관 추가 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            placeholder="새로운 습관을 입력하세요..."
            className={`flex-1 px-4 py-2 border ${borderClass} ${cardBgClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          <button
            onClick={addHabit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            추가
          </button>
        </div>
      </div>

      {/* 습관 목록 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <h3 className={`text-lg font-semibold ${textClass} mb-4`}>습관 트래커</h3>
        <div className="space-y-3">
          {habits.length === 0 ? (
            <p className={`text-center py-8 ${textSecondaryClass}`}>습관을 추가해보세요</p>
          ) : (
            habits.map(habit => (
              <div
                key={habit.id}
                className={`flex items-center gap-3 p-4 border ${borderClass} rounded-lg ${hoverClass} transition-colors`}
              >
                <button onClick={() => toggleHabit(habit.id)}>
                  {habit.checkedToday ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>
                <div className="flex-1">
                  <span className={`${habit.checkedToday ? 'text-green-600 font-medium' : textClass}`}>
                    {habit.text}
                  </span>
                  <div className={`text-sm ${textSecondaryClass} mt-1`}>
                    🔥 {habit.streak}일 연속
                  </div>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTab;