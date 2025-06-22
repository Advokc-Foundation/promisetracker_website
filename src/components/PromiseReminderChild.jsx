import './PromiseReminderChild.css'
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { processString } from '../utils/stringOperations';
import defaultBanner from '../assets/defaultBanner.png';

const PromiseReminderChild = ({pic,title,link,tracker,name}) => {
const [reminder,setReminder] = useState('');

const stylePro = ()=>{
    if(tracker === "presidential"){
        return {backgroundColor:"#FDEBEB",
                        color:"#D63321",
                        border:'1px solid #D63321',
                        borderRadius: '3px'};
    }
    if(tracker === "legislative"){
        return {backgroundColor:"#FFF0EF",
                        color:"#790E0E",
                        border:'1px solid #790E0E',
                        borderRadius: '3px'};
    }
    if(tracker === 'state'){
        return {backgroundColor:"#ECFFEF",
                        color:"#0B8600",
                        border:'1px solid #0B8600',
                        borderRadius: '3px'};
    }
}

    return ( 
        <>
        <div className='promise-child'>
            <div className='pic-det' style={{backgroundImage:`url(${pic || defaultBanner})`}}>
                <div className='remind-bell'>

                </div>
            </div>
            <div className='details'>
                <div className='menus-x'>
                    <div className='opt-1' style={stylePro()}><p>{processString(tracker)}</p></div>
                    <div className='opt-2' style={stylePro()}><p>Senate</p></div>
                </div>
                <div className='brief'>
                   
                                      <div
                                           className="updates-content12"
                                            dangerouslySetInnerHTML={{ __html: title}}
                                        />
                                                        
                </div>
                <Link to={`/blog/${link}`} className='lk'>
                    <div className='read-more'>
                        <div className='arr'></div>
                        <div className='red-link'><p>Read More</p></div>
                    </div>
                </Link> 
                
            </div>

        </div>
        </>
     );
}
 
export default PromiseReminderChild;