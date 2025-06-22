import React, { useState, useEffect } from 'react';

function StatusIcon({ status, where}) {
  const getOtherName = () => {
    const convertStatus = (status)=>{
        const noUnderscore = status.replace(/_/g, '');
        const uppercased = noUnderscore.toUpperCase();
        return uppercased;
    }

    const conStatus = convertStatus(status);

    switch (conStatus) {
        case 'NOTYETRATED':
            return 'notrated';
        case 'BROKEN':
            return 'brokenn';
        case 'INTHEWORKS':
            return 'intheworks';
        case 'KEPT':
            return 'keptt'; 
        case 'STALLED':
            return 'sttall'; 
        case 'COMPROMISED':
            return 'compro';
        default:
            return ''; 
    }
  };

  const otherClassName = getOtherName();

  return (
    <div className={`${
        where !== 'inTime' ? 'pot-icon ' : 'inTime'
      } ${otherClassName}`}
    
    ></div>
  );
}

export default StatusIcon;
