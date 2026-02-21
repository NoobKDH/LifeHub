import { getDaysInMonth, getWeekDays, isSameDay } from '../utils/dateUtils';

export const useCalendar = (currentDate, schedules, filterCategory, searchQuery) => {
  const getEventsForDate = (date) => {
    return schedules.filter(event => {
      const eventDate = new Date(event.date);
      if (isSameDay(eventDate, date)) return true;
      
      if (event.repeat !== 'none') {
        const daysDiff = Math.floor((date - eventDate) / (1000 * 60 * 60 * 24));
        
        if (event.repeat === 'daily' && daysDiff >= 0) return true;
        if (event.repeat === 'weekly' && daysDiff >= 0 && daysDiff % 7 === 0) return true;
        if (event.repeat === 'monthly' && 
            date.getDate() === eventDate.getDate() && 
            date >= eventDate) return true;
      }
      
      return false;
    }).filter(event => {
      if (filterCategory === 'all') return true;
      return event.category === filterCategory;
    }).filter(event => {
      if (!searchQuery) return true;
      return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  };

  const monthDays = getDaysInMonth(currentDate);
  const weekDays = getWeekDays(currentDate);

  return {
    monthDays,
    weekDays,
    getEventsForDate
  };
};