import './PresidentialTracker.css'
import Navbar from '../components/Navbar';
import PromisePercentage from '../components/PromisePercentageDisplay';
import PromiseExplorer from '../components/PromiseExplorer';
import TrackedPromise from '../components/TrackedPromise';
import { useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { processString,getYearFromDate } from '../utils/stringOperations';
import defaultimage from '../assets/defaultimage.png';


const PresidentialTracker = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [promises,setPromises]= useState([]);
    const [filteredPromises, setFilteredPromises] = useState([]);
    const [activeMeter,setActiveMeter]= useState(null);
    const [mId, setMId] = useState(null);
    const location = useLocation();
    const [meterID, setMeterID] = useState(null);
    const [allMeters, setAllMeters] = useState([]);
    const [prStatus, setPrStatus] = useState({
        notRated: 0,
        kept: 0,
        inWorks: 0,
        stalled: 0,
        broken: 0,
        compromised: 0,
        totalCount:0,
        meterImage:''
    });
    const [clickedMeter,setClickedMeter] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClickedMeter = (id) => {
                setMeterID(id);
    }


    // Effect to fetch the default meterId and promises
    useEffect(() => {
        const fetchDefaultMeterId = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/presidential`);
                const result = await response.json();
               setAllMeters(result.data.all_meters);
               setMeterID(result.data.current_meter.id);
    
            } catch (error) {
                console.error('Error fetching default meterId:', error);
            }finally{
                setLoading(false);
            }
        };

        fetchDefaultMeterId();
    }, []);




    // Effect to update meterId if location state has a meterId
    useEffect(() => {
        if (location.state?.meterId) {
            setMeterID(location.state.meterId);
        }
    }, [location.state]);

    useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);
    
// fetch promises by meterID
    useEffect(()=>{
            
            const fetchMeterById = async ()=>{
                if (!meterID) return; 

                setLoading(true);

               
            try{
                const response = await fetch(`${API_BASE_URL}/meter/${meterID}/presidential`);
                const result = await response.json();
                const fetchedPromises  = result.data.promises;
                setPromises(fetchedPromises);
                setFilteredPromises(fetchedPromises);
                setPrStatus({
                    notRated: result.data.not_rated,
                    kept: result.data.kept,
                    inWorks: result.data.in_works,
                    stalled: result.data.stalled,
                    broken: result.data.broken,
                    compromised: result.data.compromised,
                    totalCount:result.data.promise_count,
                    meterImage:result.data.current_meter.meter_img

                });
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false)
            }
           
        };

        fetchMeterById();
    
    },[meterID]);

        useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);

         if (loading) {
        return (
            <div className='outer-things'>
                <div className="loading-overlay1">
                    <div className="spinner1"></div>
                </div>
            </div>
            )                    
    }


    const handleLoad = (data)=>{
        
    }

    return ( 
        <>
            <div className='presidential-con'>

                <div className='president-title'>
                        <div className='pr-ti1'><p><span>Presidential</span>Tracker</p></div>
                        <div className='pr-ti2'><p>The Presidential Tracker monitors Nigerian Presidents' most important campaign promises. For each campaign promise, our reporters conduct research on the issue and then rate it based on whether or not the promise has been fulfilled.</p></div>
                </div>
                <div className='horizontal-scroll'>
                    <div className='previous-meter-con-layered '>
                            <div className='cir-con'>
                            <p className='cir-text'>PREVIOUS <br /> <span>METER</span></p>
                        </div>
                    </div>
                  
                    <div className= 'meter-dis-con'>
                        {allMeters.map(meter=>(
                            <div className={`meter-dis-child ${meterID === meter.id ? 'active-meter':''}`} onClick={()=>handleClickedMeter(meter.id)} key={meter.id}>
                               <div className='child-content'>
                                    <div className='child-pr'>
                                        <div id='cir' style={{
                                            backgroundImage:`url(${meter.meter_img || defaultimage})`,
                                            backgroundSize:'cover'
                                        }}>

                                        </div>
                                    </div>
                                    <div className='child-details'>
                                        <p className='m-till'>{processString(meter.meter_name)}</p>
                                        <p className='m-des'>{`The Promise Tracker of ${meter.name}`}</p>
                                        <p className='m-terms'><span>Term:</span> {getYearFromDate(meter.tenure_date_start)} - {getYearFromDate(meter.tenure_date_end)}</p>
                                    </div>
                               </div>
                               
                            </div>   

                        ))}
                            
                    </div>
                </div>
                <div className='pp1-con'>
                     <PromisePercentage pr={prStatus} iden={meterID}/>
                </div>
                <PromiseExplorer pr={filteredPromises} exStat={prStatus} iden={meterID} func={handleLoad}/>
                <TrackedPromise/>
               
            </div>
        </>
     );
}
 
export default PresidentialTracker;