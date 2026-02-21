import React from 'react';
import { X } from 'lucide-react';
import { categories } from '../constants/categories';

const EventModal = ({ 
  showModal, 
  setShowModal, 
  newEvent, 
  setNewEvent, 
  addEvent,
  cardBgClass,
  textClass,
  textSecondaryClass,
  borderClass
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${cardBgClass} rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold ${textClass}`}>새 일정</h3>
          <button onClick={() => setShowModal(false)} className={textSecondaryClass}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="일정 제목"
            className={`w-full px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className={`w-full px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              value={newEvent.startTime}
              onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              placeholder="시작 시간"
              className={`px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <input
              type="time"
              value={newEvent.endTime}
              onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
              placeholder="종료 시간"
              className={`px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <input
            type="text"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            placeholder="장소"
            className={`w-full px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <select
            value={newEvent.category}
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            className={`w-full px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {Object.entries(categories).map(([key, cat]) => (
              <option key={key} value={key}>{cat.name}</option>
            ))}
          </select>

          <select
            value={newEvent.repeat}
            onChange={(e) => setNewEvent({ ...newEvent, repeat: e.target.value })}
            className={`w-full px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="none">반복 안함</option>
            <option value="daily">매일</option>
            <option value="weekly">매주</option>
            <option value="monthly">매월</option>
          </select>

          <textarea
            value={newEvent.memo}
            onChange={(e) => setNewEvent({ ...newEvent, memo: e.target.value })}
            placeholder="메모"
            rows="3"
            className={`w-full px-4 py-2 ${cardBgClass} ${textClass} border ${borderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <button
            onClick={addEvent}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            일정 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;