import './StateTracker.css'
import PromisePercentage from '../components/PromisePercentageDisplay';
import NigeriaSVG from '../components/NigeriaSVG';
import EachStateSvg from '../components/EachStateSvg';
import PromiseExplorer from '../components/PromiseExplorer'
import TrackedPromise from '../components/TrackedPromise';
import { useEffect, useState, useRef } from 'react';
import useMouse from '../hooks/useMouse'
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { processString } from '../utils/stringOperations';
import defaultimage from '../assets/defaultimage.png';
import { capitalize } from '../utils/stringOperations';


const StateTracker = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const stateLocation = useLocation();
    const [childState,setChildState] = useState('Anambra');
    const [defaultState, setDefaultState] = useState('anambra');
    const [clickedState, setClickedState] = useState('Anambra');
    const [divPosition, setDivPosition] = useState({top:822,right:821})
    const [clickAction, setClickAction] = useState(false)
    const {x,y} = useMouse();
    const containerRef = useRef(null);
    const [prStateStatus, setPrStateStatus] = useState({
        notRated: 0,
        kept: 0,
        inWorks: 0,
        stalled: 0,
        broken: 0,
        compromised: 0,
        totalCount:0,
        meterImage:''
    });
    const [stateId , setStateId] = useState('');
    const [statePromise, setStatePromise] = useState([]);
    const [filteredStatePromise, setFilteredStatePromise] = useState([]);
    const [meterName, setMeterName] = useState('');
    const [govName , setGovName] = useState('');
    const [govImage, setGovImage] = useState('');
    const [loading, setLoading] = useState(true);
    

    const stateNames = ['Abia',"Adamawa", "Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Abuja","Gombe","Imo","Jigawa","Kaduna","Kano", "Katsina","Kebbi","Kogi","Kwara","Lagos","Nassarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe", "Zamfara"];
    const handleStateChild =(data)=>{
        setChildState(data);
        setClickAction(true);
    }
  
     const handleSVGClick = (e) => {
        if(containerRef.current){
            const containerRect = containerRef.current.getBoundingClientRect();
            const relativeRight = containerRect.right - x;
            const relativeY = y - containerRect.top;

            setDivPosition({ top: relativeY, right: relativeRight });
        }
       
    };
    // Effect to control meterId from pages.
    useEffect(() => {
        if (stateLocation.state?.meterId) {
            setStateId(stateLocation.state.meterId);
        }
    }, [stateLocation.state]);
    
    // Effect to fetch from mount
    useEffect(()=>{

            const fetchMeterById = async()=>{
                setLoading(true);
                try{
                    const response = await fetch(`${API_BASE_URL}/state/${defaultState}`);
                    const stateResult = await response.json();
                    const currentmeter = stateResult.data.current_meter;
                    if(!currentmeter){
                        setGovName('');
                        setMeterName('');
                        setStateId('');
                        setGovImage(defaultimage);
                    }else{
                            setGovName(stateResult.data.current_meter.name);
                            setMeterName(stateResult.data.current_meter.meter_name);
                            setStateId(stateResult.data.current_meter.id);
                            setGovImage(stateResult.data.current_meter.meter_img)
                    }
            
                    
                }catch(error){
                    console.log(error);
                }finally{
                    setLoading(false);
                }
               
            }

            fetchMeterById();
    }, [])


    // need to comback and send stateId or meterId to post email

    useEffect(()=>{
            const fetchMeterById = async()=>{
                
                 try{
                    const response = await fetch(`${API_BASE_URL}/state/${childState}`);
                    const stateResult = await response.json();
                    const currentMeter = stateResult.data.current_meter;

                    if(!currentMeter){
                            setGovName('');
                            setMeterName('');
                            setStateId('');
                            setStatePromise([]);
                            setPrStateStatus({
                                notRated: 0,
                                kept: 0,
                                inWorks: 0,
                                stalled: 0,
                                broken: 0,
                                compromised: 0,
                                totalCount: 0,
                                govImage:''
                            });
                            setGovImage(defaultimage);
                        
                    }else{
                            setGovImage(stateResult.data.current_meter.meter_img);
                            setGovName(stateResult.data.current_meter.name);
                            setMeterName(stateResult.data.current_meter.meter_name);
                            setStateId(stateResult.data.current_meter.id);
                            const fetchedPromise = stateResult.data.promises;
                            setStatePromise(fetchedPromise);
                            setPrStateStatus({
                            notRated: stateResult.data.not_rated,
                            kept: stateResult.data.kept,
                            inWorks: stateResult.data.in_works,
                            stalled: stateResult.data.stalled,
                            broken: stateResult.data.broken,
                            compromised: stateResult.data.compromised,
                            totalCount:stateResult.data.promise_count,
                            meterImage:stateResult.data.current_meter.meter_img
                                });
                    }
                    
                    
                 
                }catch(error){
                    console.log(error);
                }
               
            }

            fetchMeterById();
    }, [childState])

    //scroll to top
        useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);

    //setting clickedState and childState for clicks
        const handleStateClick =(data)=>{
            setChildState(data);
            setClickedState(data);
            setLoading(true);
        }

    const handleLoad = (data)=>{
        setLoading(data);
    }

    
    return ( 
        <>
            <div className="state-con" ref={containerRef}>
                {/*
                        <div className='little-div' style={{
                        top: `${divPosition.top}px`,
                        right: `${divPosition.right}px`,
                        zIndex:'1'}}>
                            <div className='lil-title'><p>{childState}</p></div>
                            <div className='lil-icon'></div>                      

                         </div>
                 */}
    
                
                <div className='state-title'>
                   <div className='title-st-con'>
                        <div className='st-title-inner'>
                            <p><span>State</span>Tracker</p>
                        </div>
                        <div className='st-explain'>
                            <p><span>The State Tracker monitors the most important  promises of State Governors in Nigeria.For each</span> promise, our reporters research the issue and then rate it based on whether the promise was achieved.</p>
                        </div>
                    
                   </div> 
                </div>
                <div className='states-display'>
                   {stateNames.map((state, index) => {
                            const isActive = clickedState === state;
                            const isPreviousActive = index < stateNames.length-1 && clickedState === stateNames[index + 1];

                            return (
                            <div
                                key={state}
                                className={`st-view ${isActive ? 'activeST' : ''} ${isPreviousActive ? 'previous-active' : ''}`}
                                onClick={() => handleStateClick(state)}
                            >
                                <div className="state-name">
                                <p>{state.toUpperCase()}</p>
                                </div>
                                <div id="state-view-con">
                                    <EachStateSvg data={state} isSelected={isActive} isPrevActive={isPreviousActive} />
                                </div>
                            </div>
                            );
                        })}
                </div>
                {/*
                    <div className='map-container'>
                    <div className='statesvg-con'>
                        <NigeriaSVG childData={handleStateChild} onSVGPathClick={handleSVGClick} pr={defaultState}/>
                    </div>
                    
                    <div className='state-view'>
                        <div className='state-name'>
                            <p>{childState}</p>
                        </div>
                        
                        <div id='state-view-con'>
                              <EachStateSvg data={childState} pr={defaultState}/>
                        </div>   
                    </div>
                    </div>
                */}
                <div className='rest-cn'>
                    {loading && <div className='outer-things1'>
                        <div className="loading-overlay2">
                            <div className="spinner2"></div>
                        </div>
                    </div> }
                    <div className='gov-con'>
                        <div className='gov-con-inner'>
                            <div className='gov-d'>
                                <div className='gov-img' style={{backgroundImage:`url(${govImage || defaultimage})`}}></div>
                                <div className='gov-naming'>
                                    <p id='text1'>{processString(meterName)}</p>
                                    <p id='text2'>{!govName ?"No Promise Found for this meter":`The Promise Tracker Of ${govName}` }</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='gov-details-con'>

                    </div>
                    <PromisePercentage pr={prStateStatus} iden={stateId}/>  
                    <PromiseExplorer pr={statePromise} exStat={prStateStatus} iden={stateId} func={handleLoad}/>

                </div>

                <TrackedPromise/>

            </div>
        </>
     );
}
 
export default StateTracker;