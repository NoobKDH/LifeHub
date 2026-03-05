import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { priorityColors } from '../constants/categories';

const TodoTab = ({ 
  todos, 
  newTodo, 
  setNewTodo, 
  addTodo, 
  toggleTodo, 
  deleteTodo,
  changePriority,
  changeCategory,
  cardBgClass,
  textClass,
  textSecondaryClass,
  borderClass,
  hoverClass
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  // 오늘 날짜 계산 (문자열)
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayString();

  // 필터에 따른 날짜 계산
  const getDateForFilter = (filter) => {
    if (filter === 'today') {
      return todayStr;
    }
    if (filter === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    if (filter === 'week') {
      const weekLater = new Date();
      weekLater.setDate(weekLater.getDate() + 7);
      const year = weekLater.getFullYear();
      const month = String(weekLater.getMonth() + 1).padStart(2, '0');
      const day = String(weekLater.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  };

  // 할 일 추가
  const handleAddTodo = () => {
    if (newTodo.trim() && activeFilter !== 'overdue') {
      const dueDate = getDateForFilter(activeFilter);
      addTodo(dueDate);
      setNewTodo('');
    }
  };

  // 할 일 필터링
  const getFilteredTodos = () => {
    
    return todos.filter(todo => {
    
      
      if (activeFilter === 'all') {
        return true;
      }
      
      if (activeFilter === 'today') {
        const match = todo.dueDate === todayStr;
        return match;
      }
      
      if (activeFilter === 'tomorrow') {
        const tomorrowStr = getDateForFilter('tomorrow');
        return todo.dueDate === tomorrowStr;
      }
      
      if (activeFilter === 'week') {
        const weekStr = getDateForFilter('week');
        return todo.dueDate === weekStr;
      }
      
      if (activeFilter === 'overdue') {
        if (!todo.dueDate || todo.completed) return false;
        return todo.dueDate < todayStr;
      }
      
      return false;
    });
  };

  const filteredTodos = getFilteredTodos();

  // 완료율 계산
  const completionRate = filteredTodos.length > 0 
    ? Math.round((filteredTodos.filter(t => t.completed).length / filteredTodos.length) * 100)
    : 0;

  // 마감일이 지났는지 확인
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return dueDate < todayStr;
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    if (dateString === todayStr) return '오늘';
    
    const tomorrowStr = getDateForFilter('tomorrow');
    if (dateString === tomorrowStr) return '내일';
    
    const [year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}`;
  };

  // 필터별 제목
  const getFilterTitle = () => {
    if (activeFilter === 'all') return '전체 할 일';
    if (activeFilter === 'today') return '오늘 할 일';
    if (activeFilter === 'tomorrow') return '내일 할 일';
    if (activeFilter === 'week') return '1주일 후 할 일';
    if (activeFilter === 'overdue') return '마감 지난 할 일';
    return '할 일 목록';
  };

  return (
    <div className="space-y-4">
      {/* 진행률 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${textSecondaryClass}`}>
            {getFilterTitle()} 진행률
          </span>
          <span className="text-2xl font-bold text-blue-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 필터 버튼 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-4`}>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'all' ? 'bg-gray-600 text-white' : `${textSecondaryClass} ${hoverClass}`
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveFilter('today')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'today' ? 'bg-green-600 text-white' : `${textSecondaryClass} ${hoverClass}`
            }`}
          >
            오늘
          </button>
          <button
            onClick={() => setActiveFilter('tomorrow')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'tomorrow' ? 'bg-blue-600 text-white' : `${textSecondaryClass} ${hoverClass}`
            }`}
          >
            내일
          </button>
          <button
            onClick={() => setActiveFilter('week')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'week' ? 'bg-purple-600 text-white' : `${textSecondaryClass} ${hoverClass}`
            }`}
          >
            1주일 후
          </button>
          <button
            onClick={() => setActiveFilter('overdue')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'overdue' ? 'bg-red-600 text-white' : `${textSecondaryClass} ${hoverClass}`
            }`}
          >
            마감임박
          </button>
        </div>
        
        {activeFilter !== 'all' && activeFilter !== 'overdue' && (
          <div className={`mt-3 text-sm ${textSecondaryClass}`}>
            💡 "{getFilterTitle()}"에 추가됩니다 (날짜: {getDateForFilter(activeFilter)})
          </div>
        )}
      </div>

      {/* 할 일 추가 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder={
              activeFilter === 'overdue' 
                ? '날짜를 선택해주세요 (전체/오늘/내일/1주일 후)' 
                : `${getFilterTitle()}에 추가할 내용을 입력하세요...`
            }
            disabled={activeFilter === 'overdue'}
            className={`flex-1 px-4 py-2 border ${borderClass} ${cardBgClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeFilter === 'overdue' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <button
            onClick={handleAddTodo}
            disabled={activeFilter === 'overdue'}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${
              activeFilter === 'overdue' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Plus size={20} />
            추가
          </button>
        </div>
      </div>

      {/* 할 일 목록 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <h3 className={`text-lg font-semibold ${textClass} mb-4`}>
          {getFilterTitle()}
          <span className={`text-sm font-normal ${textSecondaryClass} ml-2`}>
            ({filteredTodos.length}개)
          </span>
        </h3>
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <p className={`text-center py-8 ${textSecondaryClass}`}>
              {activeFilter === 'overdue' ? '마감이 지난 할 일이 없습니다 👍' : 
               `${getFilterTitle()}이 없습니다`}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-start gap-3 p-4 border ${borderClass} rounded-lg ${hoverClass} transition-colors ${
                  isOverdue(todo.dueDate) && !todo.completed ? 'border-red-300 bg-red-50' : ''
                }`}
              >
                <button onClick={() => toggleTodo(todo.id)} className="mt-1">
                  {todo.completed ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`${todo.completed ? `line-through ${textSecondaryClass}` : textClass} flex-1`}>
                      {todo.text}
                    </span>
                    
                    {/* 날짜 표시 */}
                    {todo.dueDate && (
                      <span className={`text-xs px-2 py-1 rounded ml-2 flex-shrink-0 ${
                        isOverdue(todo.dueDate) && !todo.completed
                          ? 'bg-red-500 text-white'
                          : todo.dueDate === todayStr
                            ? 'bg-green-500 text-white'
                            : todo.dueDate === getDateForFilter('tomorrow')
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                      }`}>
                        {formatDate(todo.dueDate)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 flex-wrap items-center">
                    <select
                      value={todo.category}
                      onChange={(e) => changeCategory(todo.id, e.target.value)}
                      className={`text-xs px-2 py-1 border ${borderClass} ${cardBgClass} ${textClass} rounded`}
                    >
                      <option value="개인">개인</option>
                      <option value="업무">업무</option>
                      <option value="쇼핑">쇼핑</option>
                      <option value="건강">건강</option>
                    </select>
                    
                    <select
                      value={todo.priority}
                      onChange={(e) => changePriority(todo.id, e.target.value)}
                      className={`text-xs px-2 py-1 border ${borderClass} ${cardBgClass} rounded ${priorityColors[todo.priority]}`}
                    >
                      <option value="high">높음</option>
                      <option value="medium">보통</option>
                      <option value="low">낮음</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 mt-1"
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

export default TodoTab;
