import React from 'react';
import { Plus, X } from 'lucide-react';

const NotesTab = ({ 
  notes, 
  newNote, 
  setNewNote, 
  addNote, 
  deleteNote,
  cardBgClass,
  textClass,
  textSecondaryClass,
  borderClass
}) => {
  return (
    <div className="space-y-4">
      {/* 메모 작성 */}
      <div className={`${cardBgClass} rounded-lg shadow-sm p-6`}>
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="메모 제목..."
          className={`w-full px-4 py-2 border ${borderClass} ${cardBgClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3`}
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="메모 내용을 입력하세요..."
          rows="4"
          className={`w-full px-4 py-2 border ${borderClass} ${cardBgClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3`}
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote.tag}
            onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
            placeholder="태그 (선택사항)"
            className={`flex-1 px-4 py-2 border ${borderClass} ${cardBgClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          <button
            onClick={addNote}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            저장
          </button>
        </div>
      </div>

      {/* 메모 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.length === 0 ? (
          <div className={`col-span-2 ${cardBgClass} rounded-lg shadow-sm p-6`}>
            <p className={`text-center py-8 ${textSecondaryClass}`}>메모를 작성해보세요</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className={`${cardBgClass} rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <h4 className={`font-semibold ${textClass}`}>{note.title}</h4>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
              <p className={`${textSecondaryClass} text-sm mb-3 whitespace-pre-wrap`}>{note.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                {note.tag && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded">
                    #{note.tag}
                  </span>
                )}
                <span className="ml-auto">{note.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesTab;