import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Search, MapPin, Clock, Repeat, Trash2, X } from 'lucide-react';
import { categories } from '../constants/categories';
import { isSameDay } from '../utils/dateUtils';

const ScheduleTab = ({ 
  currentDate,
  setCurrentDate,
  calendarView,
  setCalendarView,
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  setShowEventModal,
  setNewEvent,
  deleteEvent,
  monthDays,
  weekDays,
  getEventsForDate,
  cardBgClass,
  textClass,
  textSecondaryClass,
  borderClass,
  hoverClass
}) => {
  const today = new Date();
  const [deleteConfirm, setDeleteConfirm] = useState(null); // 삭제 확인 모달

  // 일정 삭제 확인
  const handleDeleteClick = (event, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setDeleteConfirm(event);
  };

  // 삭제 확인
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteEvent(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* 캘린더 컨트롤 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
              className={`p-2 rounded-lg ${hoverClass}`}
            >
              <ChevronLeft className={textSecondaryClass} size={20} />
            </button>
            
            <h2 className={`text-xl font-semibold ${textClass} min-w-[200px] text-center`}>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </h2>
            
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}
              className={`p-2 rounded-lg ${hoverClass}`}
            >
              <ChevronRight className={textSecondaryClass} size={20} />
            </button>
            
            <button
              onClick={() => setCurrentDate(new Date())}
              className={`px-4 py-2 ${hoverClass} rounded-lg ${textSecondaryClass}`}
            >
              오늘
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEventModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              일정 추가
            </button>
            
            {['month', 'week', 'day'].map(v => (
              <button
                key={v}
                onClick={() => setCalendarView(v)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  calendarView === v 
                    ? 'bg-blue-600 text-white' 
                    : `${textSecondaryClass} ${hoverClass}`
                }`}
              >
                {v === 'month' ? '월' : v === 'week' ? '주' : '일'}
              </button>
            ))}
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondaryClass}`} size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="일정 검색..."
              className={`w-full pl-10 pr-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">전체 카테고리</option>
            {Object.entries(categories).map(([key, cat]) => (
              <option key={key} value={key}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 월간 뷰 */}
      {calendarView === 'month' && (
        <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <div key={day} className={`text-center font-semibold py-2 ${
                i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : textSecondaryClass
              }`}>
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day, idx) => {
              const dayEvents = getEventsForDate(day.fullDate);
              const isToday = isSameDay(day.fullDate, today);
              
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setNewEvent(prev => ({ ...prev, date: day.fullDate.toISOString().split('T')[0] }));
                    setShowEventModal(true);
                  }}
                  className={`min-h-[100px] p-2 border ${borderClass} rounded-lg cursor-pointer transition-all ${
                    hoverClass
                  } ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                    !day.isCurrentMonth ? 'opacity-40' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday 
                      ? 'text-blue-600 font-bold' 
                      : idx % 7 === 0 
                        ? 'text-red-500' 
                        : idx % 7 === 6 
                          ? 'text-blue-500' 
                          : textClass
                  }`}>
                    {day.date}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(event, e);
                        }}
                        className={`text-xs px-2 py-1 rounded ${categories[event.category].color} text-white truncate hover:opacity-80 cursor-pointer flex items-center justify-between group`}
                      >
                        <span className="flex-1 truncate">
                          {event.startTime && `${event.startTime} `}
                          {event.title}
                        </span>
                        <Trash2 size={12} className="opacity-0 group-hover:opacity-100 ml-1" />
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className={`text-xs ${textSecondaryClass} px-2`}>
                        +{dayEvents.length - 3}개 더보기
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 주간 뷰 */}
      {calendarView === 'week' && (
        <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, idx) => {
              const dayEvents = getEventsForDate(day);
              const isToday = isSameDay(day, today);
              
              return (
                <div key={idx} className="space-y-2">
                  <div className={`text-center pb-2 border-b ${borderClass}`}>
                    <div className={textSecondaryClass}>
                      {['일', '월', '화', '수', '목', '금', '토'][idx]}
                    </div>
                    <div className={`text-2xl font-bold ${isToday ? 'text-blue-600' : textClass}`}>
                      {day.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg ${categories[event.category].color} text-white cursor-pointer hover:opacity-90 relative group`}
                      >
                        <div className="font-medium">{event.title}</div>
                        {event.startTime && (
                          <div className="text-xs mt-1">
                            {event.startTime} - {event.endTime}
                          </div>
                        )}
                        {event.location && (
                          <div className="text-xs mt-1 flex items-center gap-1">
                            <MapPin size={12} />
                            {event.location}
                          </div>
                        )}
                        <button
                          onClick={(e) => handleDeleteClick(event, e)}
                          className="absolute top-2 right-2 p-1 bg-white bg-opacity-20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 일간 뷰 */}
      {calendarView === 'day' && (
        <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
          <h3 className={`text-2xl font-bold mb-6 ${textClass}`}>
            {currentDate.getMonth() + 1}월 {currentDate.getDate()}일
          </h3>
          
          <div className="space-y-3">
            {getEventsForDate(currentDate).length === 0 ? (
              <p className={`text-center py-12 ${textSecondaryClass}`}>
                일정이 없습니다
              </p>
            ) : (
              getEventsForDate(currentDate).map(event => (
                <div
                  key={event.id}
                  className={`p-4 border ${borderClass} rounded-lg ${hoverClass} relative group`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-full ${categories[event.category].color} rounded`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-lg font-semibold ${textClass}`}>{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 ${categories[event.category].color} text-white rounded`}>
                            {categories[event.category].name}
                          </span>
                          <button
                            onClick={(e) => handleDeleteClick(event, e)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {event.startTime && (
                        <div className={`flex items-center gap-2 mb-2 ${textSecondaryClass}`}>
                          <Clock size={16} />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className={`flex items-center gap-2 mb-2 ${textSecondaryClass}`}>
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.repeat !== 'none' && (
                        <div className={`flex items-center gap-2 mb-2 ${textSecondaryClass}`}>
                          <Repeat size={16} />
                          <span>
                            {event.repeat === 'daily' ? '매일' : 
                             event.repeat === 'weekly' ? '매주' : '매월'} 반복
                          </span>
                        </div>
                      )}
                      
                      {event.memo && (
                        <p className={`mt-2 ${textSecondaryClass}`}>{event.memo}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${cardBgClass} rounded-lg shadow-xl p-6 max-w-md w-full`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${textClass}`}>일정 삭제</h3>
              <button onClick={() => setDeleteConfirm(null)} className={textSecondaryClass}>
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className={`${textClass} mb-2`}>이 일정을 삭제하시겠습니까?</p>
              <div className={`p-3 bg-gray-100 rounded-lg ${textSecondaryClass}`}>
                <div className="font-semibold text-gray-800">{deleteConfirm.title}</div>
                {deleteConfirm.startTime && (
                  <div className="text-sm mt-1">
                    {deleteConfirm.startTime} - {deleteConfirm.endTime}
                  </div>
                )}
                {deleteConfirm.location && (
                  <div className="text-sm mt-1">{deleteConfirm.location}</div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className={`flex-1 px-4 py-2 border ${borderClass} rounded-lg ${hoverClass} transition-colors`}
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;
