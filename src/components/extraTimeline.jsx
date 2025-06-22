import React from 'react';
import "./extraTimeline.css";
import { useState } from 'react';

const ExtraTimeline = ({ pr, up, func}) => {

  const [activeOne , setActiveOne] = useState(up.length-1);


  const handleClickOne = (data)=>{
      func(data);
      setActiveOne(data);
  }


  const getBgColor = () => {
    const normalizedStatus = pr.replace(/_/g, '').toLowerCase();
    switch (normalizedStatus) {
      case 'kept':
        return "#00BB03";
      case 'stalled':
        return "#FAE916";
      case 'intheworks':
        return "#0073E6";
      case 'compromised':
        return "#FFA500";
      case 'broken':
        return "#E20102";
      case 'notyetrated':
        return "#D9D9D9";
      default:
        return "#9B9999"; // Default color for gradient if status not found
    }
  };

  const renderStatusCircle = () => {
    const normalizedStatus = pr.replace(/_/g, '').toLowerCase();
    switch (normalizedStatus) {
      case 'kept':
        return (
          <>
            <circle cx="150" cy="50" r="10" fill="#00BB03" />
            <line x1="155" y1="48" x2="148" y2="54" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="148" y1="54" x2="144" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'stalled':
        return (
          <>
            <circle cx="150" cy="50" r="10" fill="#FAE916" />
            <rect x="146" y="44" width="3" height="12" fill="white" />
            <rect x="151" y="44" width="3" height="12" fill="white" />
          </>
        );
      case 'intheworks':
        return (
          <>
            <circle cx="150" cy="50" r="10" fill="#0073E6" />
            <circle cx="150" cy="50" r="4" fill="white" />
          </>
        );
      case 'compromised':
        return (
          <>
            <circle cx="150" cy="50" r="10" fill="#FFA500" />
            <rect x="146" y="46" width="8" height="8" fill="white" />
          </>
        );
      case 'broken':
        return (
          <>
            <circle cx="150" cy="50" r="10" fill="#E20102" />
            <line x1="145" y1="45" x2="155" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="145" y1="55" x2="155" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'notyetrated':
        return (
          <>
            <circle cx="150" cy="50" r="10" fill="#A9A9A9" />
            <circle cx="150" cy="50" r="4" fill="#FFFFFF" />
          </>
        );
      default:
        return null;
    }
  };

  const calculatePosition = (date, minDate, maxDate) => {
    const totalDuration = maxDate.getTime() - minDate.getTime();
    const timeFromStart = new Date(date).getTime() - minDate.getTime();
    return (timeFromStart / totalDuration) * 460 + 18; // Adjusted for the timeline width and padding
  };

  // const renderUpdateMarkers = () => {
  //   if (up.length === 0) return null;

  //   const startDate = new Date("2024-01-01T00:00:00.000Z");
  //   const dates = up.map(update => new Date(update.created_at));
  //   const maxDate = new Date(Math.max(...dates.map(date => date.getTime()), startDate.getTime()));

  //   return up.map((update, index) => {
  //     const xPos = calculatePosition(update.created_at, startDate, maxDate);
  //     return (
  //       <g key={index} style={{ cursor: 'pointer' }} onClick={()=>handleClickOne(index)}>
  //         <line x1={xPos} y1="50" x2={xPos} y2="70" stroke={`${activeOne === index ? 'red':"#D3D3D3"}`} strokeDasharray="1,1" strokeWidth="1" />
  //         <circle cx={xPos} cy="70" r="5" fill={`${activeOne === index ? 'red':"#D3D3D3"}`} />
  //       </g>
  //     );
  //   });
  // };

  const renderUpdateMarkers = () => {
  if (up.length === 0) return null;

  const startDate = new Date("2024-01-01T00:00:00.000Z");
  const dates = up.map(update => new Date(update.created_at));
  const maxDate = new Date(Math.max(...dates.map(date => date.getTime()), startDate.getTime()));


  const updatesByDate = up.reduce((acc, update) => {
    const dateKey = new Date(update.created_at).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(update);
    return acc;
  }, {});

  return up.map((update, index) => {
    const dateKey = new Date(update.created_at).toDateString();
    const sameDateUpdates = updatesByDate[dateKey];
    const positionOffset = sameDateUpdates.indexOf(update) * 10; 

    const xPos = calculatePosition(update.created_at, startDate, maxDate);
    const lineY2 = 70 - positionOffset;
    const circleY = 70 - positionOffset;

    return (
      <g key={index} style={{ cursor: 'pointer' }} onClick={() => handleClickOne(index)}>
        <line
          x1={xPos}
          y1="50"
          x2={xPos}
          y2={lineY2}
          stroke={activeOne === index ? 'red' : "#D3D3D3"}
          strokeDasharray="1,1"
          strokeWidth="1"
        />
        <circle
          cx={xPos}
          cy={circleY}
          r="5"
          fill={activeOne === index ? 'red' : "#D3D3D3"}
        />
      </g>
    );
  });
};

  const renderStartDateMarker = () => (
    <g>
      <line x1="105" y1="50" x2="105" y2="70" stroke="#D3D3D3" strokeWidth="1" />
      <text x='110' y='70' fontSize="14" fill="#333" className='starter-date'>2024</text>
    </g>
  );

  return (
    <svg height="100" width="100%" viewBox="0 0 484 100" preserveAspectRatio="none">
      {/* Define Gradient */}
      <defs>
        <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D9D9D9" />
          <stop offset="27%" stopColor="#D9D9D9" />
          <stop offset="27%" stopColor={getBgColor()} />
          <stop offset="100%" stopColor={getBgColor()} />
        </linearGradient>
      </defs>

      {/* Main Timeline Rectangle with Gradient Fill */}
      <rect x="20" y="48" width="460" height="4" fill="url(#timeline-gradient)" rx="2" ry="2" />

      {/* Event Circles */}
      <g>
        {/* First Circle (Dark Gray) */}
        <circle cx="60" cy="50" r="10" fill="#333333" />
        <circle cx="60" cy="50" r="4" fill="#FFFFFF" />

        {/* Second Circle (based on status) */}
        {renderStatusCircle()}

        {/* Starting Date Marker */}
        {renderStartDateMarker()}

        {/* Dynamic Update Markers */}
        {renderUpdateMarkers()}
      </g>

    </svg>
  );
};

export default ExtraTimeline;
