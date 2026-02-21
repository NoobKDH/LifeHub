import React from 'react';
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
  const completionRate = todos.length > 0 
    ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* 진행률 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${textSecondaryClass}`}>전체 진행률</span>
          <span className="text-2xl font-bold text-blue-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 할 일 추가 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="새로운 할 일을 입력하세요..."
            className={`flex-1 px-4 py-2 border ${borderClass} ${cardBgClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            추가
          </button>
        </div>
      </div>

      {/* 할 일 목록 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <h3 className={`text-lg font-semibold ${textClass} mb-4`}>할 일 목록</h3>
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className={`text-center py-8 ${textSecondaryClass}`}>할 일을 추가해보세요</p>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 border ${borderClass} rounded-lg ${hoverClass} transition-colors`}
              >
                <button onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>
                <div className="flex-1">
                  <span className={`${todo.completed ? `line-through ${textSecondaryClass}` : textClass}`}>
                    {todo.text}
                  </span>
                  <div className="flex gap-2 mt-1">
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

export default TodoTab;