import './ringShared.css'
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
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const RingShared = ({dState}) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const stateLocation = useLocation();
    const [childState,setChildState] = useState('Anambra');
    const [loading, setLoading] = useState(true);
    const [activeState, setActiveState] = useState('abia'); 
    const {x,y} = useMouse();
    const containerRef = useRef(null);
    const [prst, setPrst] = useState({
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
    const [prom, setProm] = useState([]);
    const [filteredStatePromise, setFilteredStatePromise] = useState([]);
    const [meterName, setMeterName] = useState('');
    const [govName , setGovName] = useState('');
    const [govImage, setGovImage] = useState('');

    const { id: stateName } = useParams();
    

    const handleStateChild =(data)=>{
        setChildState(data);
        setClickAction(true);
    }
  
 

    // need to comback and send stateId or meterId to post email

    useEffect(()=>{
            const fetchMeterById = async()=>{
                setLoading(true);
                 try{
                    const response = await fetch(`${API_BASE_URL}/all/promise-ring/fetch/${stateName}`);
                    const stateResult = await response.json();
                    const currentMeter = stateResult.data.promises;
            

                    if(!currentMeter){
                            setGovName('');
                            setMeterName('');
                            setStateId('');
                            setProm([]);
                            setPrst({
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
                         
                            setGovImage(stateResult.data.promises[0]?.meter.meter_img);
                            setGovName(stateResult.data.promises[0]?.meter.name);
                            setProm(stateResult.data.promises);
                            // setStateId(stateResult.data.current_meter.id);
                            setPrst({
                            notRated: stateResult.data.not_yet_rated,
                            kept: stateResult.data.kept,
                            inWorks: stateResult.data.in_the_works,
                            stalled: stateResult.data.stalled,
                            broken: stateResult.data.broken,
                            compromised: stateResult.data.compromised,
                            totalCount:stateResult.data.total_promises,
                            meterImage:stateResult.data.promises[0].meter.meter_img
                            });
                           
                    }
                    
                    
                 
                }catch(error){
                    console.log(error);
                } finally {
                setLoading(false);
            }
               
            }

            fetchMeterById();
    }, [])

    //scroll to top
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
        setLoading(data);
    }

    
    return ( 
        <>
            <div className="state-con" ref={containerRef}>
                
                <div className='gov-con'>
                    <div className='gov-con-inner'>
                        <div className='gov-d'>
                            <div className='gov-img' style={{backgroundImage:`url(${govImage || defaultimage})`}}></div>
                            <div className='gov-naming'>
                                <p id='text1'>{!govName ? "":processString(govName)}</p>
                                <p id='text2'>{!govName ?"No Promise Found for this meter":`The Promise Ring Of ${govName}` }</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='gov-details-con'>

                </div>
                <PromisePercentage pr={prst} iden={stateId}/>  
                <PromiseExplorer pr={prom} exStat={prst} iden={stateId} func={handleLoad}/>
                {/* <TrackedPromise/> */}

            </div>
        </>
     );
}
 
export default RingShared;