import React, { useEffect, useState } from 'react';
import './customTimeline.css';

const TimelineLine = () => {
  const [updates, setUpdates] = useState([]); // State to hold the updates

  // Simulating fetching updates with dates
  useEffect(() => {
    const fetchUpdates = async () => {
      // Simulating updates with specific dates
      const fetchedUpdates = [
        { date: '2024-01-01', text: 'Update 1' },
        { date: '2024-01-15', text: 'Update 2' },
        { date: '2024-02-12', text: 'Update 3' },
        { date: '2024-02-25', text: 'Update 4' },
        { date: '2024-03-05', text: 'Update 5' },
      ];
      setUpdates(fetchedUpdates);
    };

    fetchUpdates();
  }, []);

  // Function to calculate left position based on dates
  const calculateLeftPosition = (date, minDate, maxDate) => {
    const totalDays = (new Date(maxDate) - new Date(minDate)) / (1000 * 60 * 60 * 24); // Total days in the range
    const daysFromMin = (new Date(date) - new Date(minDate)) / (1000 * 60 * 60 * 24); // Days from min date
    return (daysFromMin / totalDays) * 100; // Convert to percentage
  };

  if (updates.length === 0) return null; // Render nothing if no updates

  // Calculate min and max dates
  const dates = updates.map(update => update.date);
  const minDate = Math.min(...dates.map(date => new Date(date)));
  const maxDate = Math.max(...dates.map(date => new Date(date)));

  return (
    <div className="line-container">
      <div className='status-cir'></div>
      <div className='main-status-cir'></div>
      <div className="line"></div>
      {updates.map((update, index) => {
        const leftPercentage = calculateLeftPosition(update.date, minDate, maxDate); // Get left position based on date
        return (
          <div className="con-tin" key={index} style={{ left: `${leftPercentage}%` }}>
            <div className="circle1"></div>
            <div className="wick"></div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineLine;
