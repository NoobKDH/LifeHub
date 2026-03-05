import React, { useState, useEffect } from 'react';
//import { useStorage } from './hooks/useStorage';
import { useCalendar } from './hooks/useCalendar';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import TodoTab from './components/TodoTab';
import HabitTab from './components/HabitTab';
import ScheduleTab from './components/ScheduleTab';
import NotesTab from './components/NotesTab';
import EventModal from './components/EventModal';

function App() {
  const [activeTab, setActiveTab] = useState('todo');
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // 일정 관련 state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [newTodo, setNewTodo] = useState('');
  const [newHabit, setNewHabit] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '', tag: '' });
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'personal',
    repeat: 'none',
    memo: ''
  });

  useEffect(() => {
    const loadedTodos = localStorage.getItem('todos');
    const loadedHabits = localStorage.getItem('habits');
    const loadedSchedules = localStorage.getItem('schedules');
    const loadedNotes = localStorage.getItem('notes');
    const loadedDarkMode = localStorage.getItem('darkMode');

    if (loadedTodos) setTodos(JSON.parse(loadedTodos));
    if (loadedHabits) setHabits(JSON.parse(loadedHabits));
    if (loadedSchedules) setSchedules(JSON.parse(loadedSchedules));
    if (loadedNotes) setNotes(JSON.parse(loadedNotes));
    if (loadedDarkMode) setDarkMode(JSON.parse(loadedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // 캘린더 훅 사용
  const { monthDays, weekDays, getEventsForDate } = useCalendar(
    currentDate,
    schedules,
    filterCategory,
    searchQuery
  );

  // 할 일 관련 함수
  const addTodo = (dueDate = null) => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        priority: 'medium',
        category: '개인',
        dueDate: dueDate
      }]);
      setNewTodo('');
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const changePriority = (id, priority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  const changeCategory = (id, category) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, category } : todo
    ));
  };

  const changeDueDate = (id, dueDate) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, dueDate } : todo
    ));
  };
  // 습관 관련 함수
  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now(),
        text: newHabit,
        streak: 0,
        lastChecked: null,
        checkedToday: false
      }]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id) => {
    const today = new Date().toDateString();
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const wasCheckedToday = habit.lastChecked === today;
        return {
          ...habit,
          checkedToday: !wasCheckedToday,
          lastChecked: wasCheckedToday ? null : today,
          streak: wasCheckedToday ? Math.max(0, habit.streak - 1) : habit.streak + 1
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  // 일정 관련 함수
  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setSchedules([...schedules, {
        id: Date.now(),
        ...newEvent
      }]);
      
      setNewEvent({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        category: 'personal',
        repeat: 'none',
        memo: ''
      });
      
      setShowEventModal(false);
    }
  };

  const deleteEvent = (id) => {
    setSchedules(schedules.filter(e => e.id !== id));
  };

  // 메모 관련 함수
  const addNote = () => {
    if (newNote.title.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        ...newNote,
        date: new Date().toLocaleDateString()
      }]);
      setNewNote({ title: '', content: '', tag: '' });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // 스타일 클래스
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className={`min-h-screen ${bgClass} p-4 transition-colors duration-200`}>
      <div className="max-w-6xl mx-auto">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          textClass={textClass}
          textSecondaryClass={textSecondaryClass}
          cardBgClass={cardBgClass}
          hoverClass={hoverClass}
        />

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          textSecondaryClass={textSecondaryClass}
          hoverClass={hoverClass}
          cardBgClass={cardBgClass}
          borderClass={borderClass}
        />

        {activeTab === 'todo' && (
          <TodoTab
            todos={todos}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            changePriority={changePriority}
            changeCategory={changeCategory}
            changeDueDate={changeDueDate}
            cardBgClass={cardBgClass}
            textClass={textClass}
            textSecondaryClass={textSecondaryClass}
            borderClass={borderClass}
            hoverClass={hoverClass}
          />
        )}

        {activeTab === 'habits' && (
          <HabitTab
            habits={habits}
            newHabit={newHabit}
            setNewHabit={setNewHabit}
            addHabit={addHabit}
            toggleHabit={toggleHabit}
            deleteHabit={deleteHabit}
            cardBgClass={cardBgClass}
            textClass={textClass}
            textSecondaryClass={textSecondaryClass}
            borderClass={borderClass}
            hoverClass={hoverClass}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            calendarView={calendarView}
            setCalendarView={setCalendarView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            setShowEventModal={setShowEventModal}
            setNewEvent={setNewEvent}
            deleteEvent={deleteEvent}
            monthDays={monthDays}
            weekDays={weekDays}
            getEventsForDate={getEventsForDate}
            cardBgClass={cardBgClass}
            textClass={textClass}
            textSecondaryClass={textSecondaryClass}
            borderClass={borderClass}
            hoverClass={hoverClass}
          />
        )}

        {activeTab === 'notes' && (
          <NotesTab
            notes={notes}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
            deleteNote={deleteNote}
            cardBgClass={cardBgClass}
            textClass={textClass}
            textSecondaryClass={textSecondaryClass}
            borderClass={borderClass}
          />
        )}

        <EventModal
          showModal={showEventModal}
          setShowModal={setShowEventModal}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          addEvent={addEvent}
          cardBgClass={cardBgClass}
          textClass={textClass}
          textSecondaryClass={textSecondaryClass}
          borderClass={borderClass}
        />
      </div>
    </div>
  );
}

export default App;
