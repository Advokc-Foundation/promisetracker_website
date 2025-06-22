import './PromiseReminder.css'
import PromiseReminderChild from '../components/PromiseReminderChild'
import TrackedPromise from '../components/TrackedPromise';
import { useState,useEffect } from 'react';

const PromiseReminder = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [dataReminder,setDataReminder] = useState([]);
    const [stateReminder, setStateReminder] = useState([]);
    const [legislativeReminder, setLegislativeReminder] = useState([]);
    const [presidentialReminder, setPresidentialReminder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [option, setOption] = useState('presidential');
    const itemsPerPage = 6;

    useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

     //handling page change
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

    useEffect( ()=>{
        const fetchAllReminders = async ()=>{
            try{
                const stateResponse = await fetch(`${API_BASE_URL}/promise/reminders/fetch/state`);
                const legisResponse = await fetch(`${API_BASE_URL}/promise/reminders/fetch/legislative`);
                const presidentialResponse = await fetch(`${API_BASE_URL}/promise/reminders/fetch/presidential`);

                const stateResult = await stateResponse.json();
                const legisResult = await legisResponse.json();
                const presResult = await presidentialResponse.json();
                setLegislativeReminder(legisResult.data);
                setPresidentialReminder(presResult.data);
                setStateReminder(stateResult.data);
                console.log(stateResult);
                setDataReminder(presResult.data);
            }catch(error){
                console.error("Error fetching the reminders")
            }
          
        }

        fetchAllReminders();
    },[])

    const handleToggle =(data)=>{
        setOption(data);
        if(data === "state"){
            setDataReminder(stateReminder);
        }
        if(data === 'legislative'){
            setDataReminder(legislativeReminder);
        }
        if(data === 'presidential'){
            setDataReminder(presidentialReminder);
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReminders = dataReminder.slice(indexOfFirstItem, indexOfLastItem);
    return (  
        <>
        <div className='remind-con'>
            <div className='remind-inner'>
                <div className='pr-reminder-head'>
                     <div className='pr-reminder-tl'>
                        <div className='detals'>
                             <div className='tl4'><p>Promise <span>Reminder</span></p></div>
                            <div className='tl5'><p>Advokc reminds elected officials of their promises where there are no evidence of progress or stallment.</p></div>
                        </div>
                           
                    </div>
                </div>
                <div className='child-con-pr'>
                    <div className='toggler'>
                        <div className={`pres ${option === 'presidential' ? "activeopt":""}`} onClick={()=>handleToggle('presidential')} ><p>Presidential Tracker</p></div>
                        <div className={`state-0 ${option === 'state' ? "activeopt":""}`} onClick={()=>handleToggle('state')}><p>State Tracker</p></div>
                        <div className={`legis-0 ${option === 'legislative' ? "activeopt":""}`} onClick={()=>handleToggle('legislative')}><p>Legislative Tracker</p></div>
                    </div>
                    <div className='reminder-pr-child-con'>
                        
                       {currentReminders && currentReminders.map((reminder,index)=>(
                        <PromiseReminderChild pic={reminder.promise.promise_img} title={reminder.blog} link={reminder.promise_id} tracker={reminder.promise_tracker_type} name={reminder.promise.status} key={index}/>
                       ))} 
                    
                    </div>
                    <div className="pagination1">
                            {[...Array(Math.ceil(dataReminder.length / itemsPerPage)).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    onClick={() => handlePageChange(number + 1)}
                                    className={currentPage === number + 1 ? 'active1' : ''}
                                >
                                    {number + 1}
                                </button>
                            ))}
                    </div>
                    
                </div>
            </div>      
            <TrackedPromise/>
        </div>
   
        </>
    );
}
 
export default PromiseReminder;