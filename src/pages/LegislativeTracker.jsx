import './LegislativeTracker.css'
import PromisePercentage from '../components/PromisePercentageDisplay';
import PromiseExplorer from '../components/PromiseExplorer';
import TrackedPromise from '../components/TrackedPromise';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { processString } from '../utils/stringOperations.js';
import defaultimage from '../assets/defaultimage.png';


const LegislativeTracker = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const legLocation = useLocation();

    const[activeHouse, setActiveHouse]= useState('senate');
    const[housePicUrl, setHousePicUrl] = useState('');
    const [isLegCome, setIsLegCome] = useState(true);
    const [allLegislativeMeter, setAllLegislativeMeter] = useState([]);
    const [legMeterId, setLegMeterId] = useState(null);
    const [prLegStatus, setPrLegStatus] = useState({
        notRated: 0,
        kept: 0,
        inWorks: 0,
        stalled: 0,
        broken: 0,
        compromised: 0,
        totalCount:0,
        meter_Image:''
    });
    const [legPromises,setLegPromises] = useState([]);
    const [filteredLegPromises,setFilteredLegPromises] = useState([]);
    const [chamber, setChamber] = useState(true);
    const [lowerChamberMeters, setLowerChamberMeters] = useState([]);
    const [upperChamberMeters, setUpperChamberMeters] = useState([]);
    const [defaultChamber, setDefaultChamber] = useState('');
    const [firstUpper, setFirstUpper] = useState({});
    const [firstLower, setFirstLower] = useState({});
    const [loading, setLoading] = useState(true);
   


    const handleSenateClick =(param)=>{
        setActiveHouse(param);
        if(param==='senate'){
            setHousePicUrl('../assets/seal-senate.png')
            setChamber(true);
        }else if(param==='representative'){
            setHousePicUrl('../assets/seal-house-rep.png')
            setChamber(false);
        }
    }

    useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleGrab = (selectedId) => {
        setLegMeterId(selectedId)
    };

     // Effect to fetch the default meterId and promises
    useEffect(() => {
        const fetchDefaultMeterId = async () => {
            setLoading(true);
            try {
                const upperResponse = await fetch(`${API_BASE_URL}/legislative/upper-chamber`);
                const lowerResponse = await fetch(`${API_BASE_URL}/legislative/lower-chamber`);
                
                const upperResult = await upperResponse.json();
                const lowerResult = await lowerResponse.json();
                const currentMeter = upperResult.data.current_meter;
                
                const firstUpper = upperResult.data.all_meters[0];
                const firstLower = lowerResult.data.all_meters[0];
                if(!firstUpper){
                    setFirstUpper([]);
                }else{
                     setFirstUpper(firstUpper);
                }
                if(!firstLower){
                    setFirstLower([]);
                }else{
                    setFirstLower(firstLower);
                }
               
               
                if(!currentMeter){
                     setDefaultChamber('');
                     setPrLegStatus({
                                notRated: 0,
                                kept: 0,
                                inWorks: 0,
                                stalled: 0,
                                broken: 0,
                                compromised: 0,
                                totalCount: 0,
                                meter_Image:''
                            });
                    setLowerChamberMeters([]);
                    setUpperChamberMeters([]);
                    setFilteredLegPromises([]);
                       
                }
                else{
                    setLegMeterId(upperResult.data.current_meter.id);
                    setDefaultChamber(upperResult.data.current_meter.name);
                }
               
    
            } catch (error) {
                console.error('Error fetching default meterId:', error);
            }finally{
                setLoading(false)
            }
        };

        fetchDefaultMeterId();
    }, []);

    // Effect to update meterId if location state has a meterId
    useEffect(() => {
        if (legLocation.state?.meterId) {
            setLegMeterId(legLocation.state.meterId);
        }
    }, [legLocation.state]);

    // fetch promises by meterID
    useEffect(()=>{
            const fetchMeterById = async ()=>{
                setLoading(true); 
            try{
                const upperResponse = await fetch(`${API_BASE_URL}/meter/${legMeterId}/legislative/upper-chamber`);
                const upperResult = await upperResponse.json();
                const upchamb =upperResult.data.all_meters;
                if(!upchamb){
                    setUpperChamberMeters([]);
                }else{
                    setUpperChamberMeters(upperResult.data.all_meters);
                }
                

                const lowerResponse = await fetch(`${API_BASE_URL}/meter/${legMeterId}/legislative/lower-chamber`); 
                const lowerResult = await lowerResponse.json();
                setLowerChamberMeters(lowerResult.data.all_meters);
                
                
                const fetchedPromises  = upperResult.data.promises;
                setLegPromises(fetchedPromises);
                setFilteredLegPromises(fetchedPromises);
                setPrLegStatus({
                    notRated: upperResult.data.not_rated,
                    kept: upperResult.data.kept,
                    inWorks: upperResult.data.in_works,
                    stalled: upperResult.data.stalled,
                    broken: upperResult.data.broken,
                    compromised: upperResult.data.compromised,
                    totalCount:upperResult.data.promise_count,
                    meterImage:upperResult.data.current_meter.meter_img
                }); 
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
           
        };
        if(legMeterId){
             fetchMeterById();
        }
       
    
    },[legMeterId]);

function removeAssembly(text) {
  return text.replace(/\bassembly\b/i, "").trim();
}




    const handleLoad = (data)=>{
        setLoading(data);
    }



    return ( 
        <>
        <div className='legis-con'>
            
             <div className='legis-title'>
                   <div className='title-lg-con'>
                        <div className='lg-title-inner'>
                            <p><span>Legislative</span>Tracker</p>
                        </div>
                        <div className='lg-explain'>
                            <p> The tracker monitors the most important promises made by the House of Representatives in Nigeria. Our Promise Review Council evaluates each selected promise against predefined criteria. Our reporters then research the promises and assign a rating based on their status.</p>
                        </div>         
                   </div>                
            </div> 
            <div className='legis-display'>
                <div className='legis-display-inner'>
                    <div className='assembly-con'>
                        <div className='assembly-div' onClick={()=>setLegMeterId(firstUpper.id)}>
                            <div className='assembly-icon ninth-bg' style={{backgroundImage:`url(${firstUpper.meter_img || defaultimage})`, backgroundSize:"cover"}}>

                            </div>
                            <div className='assembly-details'>
                                <p id='p1'>{firstUpper.name}</p>
                                <p id='p2'>The Promise Tracker of The {removeAssembly(firstUpper.name || "")} Legislative Assembly</p>
                            </div>
                        </div>
                        <div className='assembly-div' onClick={()=>setLegMeterId(firstLower.id)}>
                            <div className='assembly-icon tenth-bg' style={{backgroundImage:`url(${firstLower.meter_img || defaultimage})`,backgroundSize:"cover"}}>

                            </div>
                            <div className='assembly-details'>
                                <p id='p1'>{firstLower.name}</p>
                                <p id='p2'>The Promise Tracker of The {removeAssembly(firstLower.name || "")} Legislative Assembly</p>
                            </div>
                        </div>
                    </div>
                    <div className='diff-con'>
                        <div className={`senate-con ${activeHouse === "senate"? "activeHouse":''}`} onClick={()=>handleSenateClick('senate')}>
                            <div className='senate-icon'></div>
                            <p className='senate-text'>Senate</p>
                        </div>
                        <div className={`legislative-con ${activeHouse === "representative"? "activeHouse":''}`} onClick={()=>handleSenateClick('representative')}>
                            <div className='rep-icon '></div>
                            <p className='senate-text'>House of Representatives</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rest-cn'>
                {loading && <div className='outer-things1'>
                        <div className="loading-overlay2">
                            <div className="spinner2"></div>
                        </div>
                    </div> }
                <PromisePercentage pr={prLegStatus} con={isLegCome} meterData ={[upperChamberMeters,lowerChamberMeters,chamber,defaultChamber]} grabMeterId={handleGrab} />
                <PromiseExplorer pr={filteredLegPromises} exStat={prLegStatus} iden={legMeterId} func={handleLoad}/>
            </div>
            <TrackedPromise/>
        </div>
        </>
     );
}
 
export default LegislativeTracker;