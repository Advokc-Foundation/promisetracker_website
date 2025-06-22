import './timelineSvg.css'


const timelineSvg = ({status}) => {

const getRegColor = () => {

    const convertStatus = (status)=>{
        const noUnderscore = status.replace(/_/g, '');
        const uppercased = noUnderscore.toUpperCase();
        return uppercased;
    }

    const conStatus = convertStatus(status);

    switch (conStatus) {
        case 'NOTYETRATED':
            return '#D9D9D9';
        case 'BROKEN':
            return '#E20102';
        case 'INTHEWORKS':
            return '#0073E6';
        case 'KEPT':
            return '#00BB03'; 
        case 'STALLED':
            return '#FAE916'; 
        case 'COMPROMISED':
            return '#FFA500';
        default:
            return ''; 
    }
  };

   const color = getRegColor();


    return ( 
        <>
            <svg width="auto" height="52" viewBox="0 0 490 52" fill="none" xmlns="http://www.w3.org/2000/svg" className='time-svg'>
            <path d="M35 13V40.5" stroke="#D9D9D9"/>
            <path d="M121 13V40.5" stroke="#D9D9D9"/>
            <circle cx="35" cy="46" r="6" fill="#D9D9D9"/>
            <circle cx="121" cy="46" r="6" fill="#D9D9D9"/>
            <path d="M323 13V35" stroke="#D9D9D9" stroke-dasharray="1 1"/>
            <path d="M383 13V35" stroke="#D9D9D9" stroke-dasharray="1 1"/>
            <path d="M287 10V32" stroke="#D9D9D9" stroke-dasharray="1 1"/>
            <circle cx="323" cy="39" r="6" fill="#D9D9D9"/>
            <circle cx="383" cy="39" r="6" fill="#D9D9D9"/>
            <circle cx="287" cy="36" r="6" fill="#D9D9D9"/>
            <rect y="10" width="490" height="4" rx="2" fill="#D9D9D9"/>
            <rect x="157" y="10" width="333" height="4" rx="2" fill={color}/>
            <path d="M70 23.377C76.2132 23.377 81.25 18.3402 81.25 12.127C81.25 5.91375 76.2132 0.876953 70 0.876953C63.7868 0.876953 58.75 5.91375 58.75 12.127C58.75 18.3402 63.7868 23.377 70 23.377Z" fill="#555555"/>
            <path d="M70 17.127C72.7615 17.127 75 14.8884 75 12.127C75 9.36553 72.7615 7.12695 70 7.12695C67.2386 7.12695 65 9.36553 65 12.127C65 14.8884 67.2386 17.127 70 17.127Z" fill="white"/>
            <path d="M191 13.5V31.5" stroke="#D9D9D9"/>
            </svg>
        </>
     );
}
 
export default timelineSvg;