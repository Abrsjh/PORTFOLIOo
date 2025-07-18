import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, X } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarDay {
  date: Date;
  available: boolean;
  timeSlots: TimeSlot[];
}

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Generate calendar data for the next 30 days
  const generateCalendarData = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for availability (can be customized)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const available = !isWeekend && Math.random() > 0.3; // 70% chance of availability
      
      const timeSlots: TimeSlot[] = [
        { time: '9:00 AM', available: available && Math.random() > 0.3 },
        { time: '10:00 AM', available: available && Math.random() > 0.3 },
        { time: '11:00 AM', available: available && Math.random() > 0.3 },
        { time: '2:00 PM', available: available && Math.random() > 0.3 },
        { time: '3:00 PM', available: available && Math.random() > 0.3 },
        { time: '4:00 PM', available: available && Math.random() > 0.3 },
      ];
      
      days.push({ date, available, timeSlots });
    }
    
    return days;
  };

  const [calendarData] = useState(generateCalendarData());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDateSelect = (day: CalendarDay) => {
    if (day.available) {
      setSelectedDate(day.date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBookingOpen(true);
      // Here you would typically integrate with a booking system
      console.log('Booking requested for:', selectedDate, selectedTime);
    }
  };

  const selectedDay = calendarData.find(day => 
    selectedDate && day.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <motion.div
      className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Calendar className="mr-3 text-primary-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Schedule a Call
        </h3>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar Grid */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Select a Date
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {calendarData.slice(0, 21).map((day, index) => (
              <motion.button
                key={day.date.toISOString()}
                onClick={() => handleDateSelect(day)}
                disabled={!day.available}
                className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                  selectedDate?.toDateString() === day.date.toDateString()
                    ? 'bg-primary-500 text-white'
                    : day.available
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={day.available ? { scale: 1.05 } : {}}
                whileTap={day.available ? { scale: 0.95 } : {}}
              >
                <div className="text-xs">{formatDate(day.date).split(' ')[0]}</div>
                <div className="font-medium">{day.date.getDate()}</div>
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-500 rounded mr-2"></div>
              Selected
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded mr-2"></div>
              Available
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-50 dark:bg-gray-900 rounded mr-2"></div>
              Unavailable
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            {selectedDate ? `Available Times - ${formatDate(selectedDate)}` : 'Select a date first'}
          </h4>
          
          <AnimatePresence mode="wait">
            {selectedDay ? (
              <motion.div
                key={selectedDate?.toISOString()}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {selectedDay.timeSlots.map((slot, index) => (
                  <motion.button
                    key={slot.time}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                      selectedTime === slot.time
                        ? 'bg-primary-500 text-white'
                        : slot.available
                        ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={slot.available ? { scale: 1.02 } : {}}
                    whileTap={slot.available ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {slot.time}
                      </div>
                      {selectedTime === slot.time && (
                        <CheckCircle size={16} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Please select a date to view available time slots</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Book Button */}
          {selectedDate && selectedTime && (
            <motion.button
              onClick={handleBooking}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book {selectedTime} on {formatDate(selectedDate)}
            </motion.button>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsBookingOpen(false)}
            />
            <motion.div
              className="relative bg-white dark:bg-dark-surface rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Booking Request Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I'll send you a calendar invite for {selectedTime} on {selectedDate && formatDate(selectedDate)} within the next hour.
                </p>
                <motion.button
                  onClick={() => setIsBookingOpen(false)}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AvailabilityCalendar;