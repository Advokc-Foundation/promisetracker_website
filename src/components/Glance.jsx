import './Glance.css'
import { useState, useEffect } from 'react';

const Glance = () => {
    const [proStats, setProStats] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    useEffect(()=>{
        const fetchGlance = async ()=>{
            try{
                const statsResponse= await fetch(`${API_BASE_URL}/total/promise/tracked`);
                const stats = await statsResponse.json();
                setProStats(stats.data);
            }catch(error){
                console.log(error);
            }
          
        }

        fetchGlance();
    },[])


    return ( 

        <div className='glance-con'>
                    <div id='con1'>
                        <div>
                            <p>Data gathered at a <span className='con1-span'>glance</span></p>
                        </div>
                    </div>
                    <div id='con2'>
                        <div>
                            <p> Our metrics reveal the journey from promise to delivery- showing promises tracked, kept, broken, and the responses received from our reminders.</p>
                        </div>
                    </div>
                    <div id='con3'>
                        <div className='inner-con3'>
                            <div id='con3-title'><p>Total Promise Tracked</p></div>
                            <div id='con3-count'><p>{proStats.total_promises}</p></div>
                        </div>
                        <div className='inner-con3'>
                            <div id='con3-title'><p>Total Promise Kept</p></div>
                            <div id='con3-count'><p>{proStats.kept}</p></div>
                        </div>
                        <div className='inner-con3'>
                            <div id='con3-title'><p>Promise Broken</p></div>
                            <div id='con3-count'><p>{proStats.broken}</p></div>
                        </div>
                        <div className='inner-con3'>
                            <div id='con3-title'><p>Reminder Sent</p></div>
                            <div id='con3-count'><p>{proStats.reminders_sent}</p></div>
                        </div>
                        <div className='inner-con3'>
                            <div id='con3-title'><p>In The Works</p></div>
                            <div id='con3-count'><p>{proStats.in_the_works}</p></div>
                        </div>
                    </div>

                </div>
    
     );
}
 
export default Glance;