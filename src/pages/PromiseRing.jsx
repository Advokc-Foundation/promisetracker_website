import '../pages/PromiseRing.css';
import PromiseNigeria from '../components/PromiseNigeria';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import defaultBanner from '../assets/defaultBanner.png';
import defaultimage from '../assets/defaultimage.png';
import useMouse from '../hooks/useMouse';
import EachStateSvg from '../components/EachStateSvg';
import estimateRead from '../utils/readingTime';
import { processString } from '../utils/stringOperations';
import RingShared from '../components/ringShared';
import RingLayout from '../layout/ringLayout';


const PromiseRing = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const ringLocation = useLocation();
    const [activeState, setActiveState] = useState(null); 
    const [statePromise, setStatePromise] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [defaultPromise, setDefaultPromise] = useState({});
    const [defaultIndex, setDefaultIndex] = useState(0);
     const [clickedState, setClickedState] = useState('Anambra');
    const [activeButton, setActiveButton] = useState(0);
    const containerRef = useRef(null);
    const {x,y} = useMouse();
    const [divPosition, setDivPosition] = useState({top:572,right:965})
    const [govImage, setGovImage] = useState(null);
    const [loading,setLoading] = useState(true);
    const stateNames = ['Abia',"Adamawa", "Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Abuja","Gombe","Imo","Jigawa","Kaduna","Kano", "Katsina","Kebbi","Kogi","Kwara","Lagos","Nassarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe", "Zamfara"];
    

    const handleStateChild = (data) => {
     
    };

    const handleStateClick =(data)=>{
             if (data !== activeState) {
            setActiveState(data);
            setIsLoading(true);
        }
     }

    const handlePromiseBtnClicked = (index) => {
        setDefaultIndex(index);
        setDefaultPromise(statePromise[index]);
        setActiveButton(index);
    };



        const handleRingClick = (e) => {
        if(containerRef.current){
            const containerRect = containerRef.current.getBoundingClientRect();
            const relativeRight = containerRect.right - x;
            const relativeY = y - containerRect.top;

            setDivPosition({ top: relativeY, right: relativeRight });
        }
       
    };

    useEffect(() => {
        const stateName = ringLocation.state?.stateName || 'Lagos'; 
        setActiveState(stateName);
    }, [ringLocation.state]);

    useEffect(() => {
        if (!activeState) return; // Do nothing if activeState is not set yet
        
        setActiveButton(0);
        setDefaultIndex(0);
        const fetchRingByName = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/all/promise-ring/fetch/${activeState}`);
                const stateResult = await response.json();
                const data = stateResult.data;

                if (data && Array.isArray(data) && data.length > 0) {
                    setStatePromise(data);
                    setDefaultIndex(0);
                    setDefaultPromise(data[0]);
                    setGovImage(data[0].meter.meter_img);
                } else {
                    setStatePromise([]);
                    setGovImage(null);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRingByName();
    }, [activeState]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const formatStatus = (status) => {
        if (!status) return "";
        const noUnderscore = status.replace(/_/g, '');
        const uppercased = noUnderscore.toUpperCase();
        return uppercased;
    };

    if (loading) {
        return (
            <div className='outer-things'>
                <div className="loading-overlay1">
                    <div className="spinner1"></div>
                </div>
            </div>
            )                    
    }

    return (
        <>
            <div className="ring-con">

                <RingShared/>
                 {/* <div className='ring-map-con' style={{position:'relative'}} ref={containerRef}>
                    <div className='ring-map-inner'>
                        <div className='ring-title'><p>Promise Ring</p></div>
                        <div className='ring-map'>
                           
                            <div className='states-display'>
                            {stateNames.map((state, index) => {
                                        const isActive = activeState === state;
                                        const isPreviousActive = index < stateNames.length-1 && activeState === stateNames[index + 1];

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
                            {isLoading && (
                                <div className="loading-overlay">
                                    <div className="spinner"></div>
                                </div>
                            )}
                        </div>
                          <div style={{background:'transparent',height:'200px',width:'150px',
                                       zIndex:'9999',  top: `${divPosition.top}px`,
                                        right: `${divPosition.right}px`, marginLeft:'30px',marginTop:'20px'
                                        }}>
                                    <div className='to-apply'>
                                             <div className='cir-pic'>
                                                 <div className='circle' style={{ backgroundImage: `url(${govImage || defaultimage})` }}>
                                                </div>  
                                            </div>
                                    </div>
                                    <div className='promisecount'>
                                        <div className='ring-icon'>
                                            <div id='svg-logo'></div>
                                        </div>
                                        <div className='pr-co'>
                                            <p id='title-move'>Promises</p>
                                            <p id='title-count'>{statePromise.length}</p>
                                        </div>
                                    </div>
                                    <div className='sta-name'>{activeState}</div>
                        </div>
                    </div>
                </div> 


                {!isLoading && statePromise.length > 0 && (
                    <div className='others-con'>
                        <div className='others-con-inner'>
                            <div className='pr-btn-con'>
                                {statePromise.map((promise, index) => (
                                    <div className={`pr-btn ${activeButton === index ? "activatedPro":""}`} key={index} onClick={() => handlePromiseBtnClicked(index)}>
                                        <div id='icon'></div>
                                        <div id='txt'><p>{`Promise ${index + 1}`}</p></div>
                                    </div>
                                ))}
                            </div>
                            <div className='pr-writings-div'>
                                <p id='text1'>{`Posted ${formatDate(defaultPromise.created_at)}`}</p>
                                <p id='text2'>{`Last Updated ${formatDate(defaultPromise.updated_at)}`}</p>
                                <div id='text3'>
                                    <p className='aut-name'>{defaultPromise.admin.name}</p>
                                    <div className='aut-icon'></div>
                                </div>
                            </div>
                            <div className='pr-vid-con'>
                                <div className='pr-vid-player'>
                                    <div className='main-vid' style={{ backgroundImage: `url(${defaultPromise.promise_img || defaultBanner})` }}></div>
                                    <div className='topic-div'>
                                        <div className='topic-inner'>
                                            <p className='tp'>{processString(defaultPromise.title)}</p>
                                            <div className='topic-info'>
                                                <div id='first'><p>{processString(defaultPromise.subject_area)}</p></div>
                                                <div id='second'><p>{estimateRead(defaultPromise.promise_blog)} mins read</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='vid-status'>
                                    <div className='status-br-con'>
                                        <div id='st-icon'></div>
                                        <div className='st-term'><p>{formatStatus(defaultPromise.status)}</p></div>
                                        <div className='st-term'><p>{defaultPromise.update_count}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!isLoading && statePromise.length > 0 && (
                    <div className='pr-blog-con'>
                        <div className='pr-blog-inner'>
                            <div className='pr-blogcon'>
                                <div className='pr-blog-para'>
                                    {defaultPromise && (
                                        <div
                                            className="promise-blog2"
                                            dangerouslySetInnerHTML={{ __html: defaultPromise.promise_blog }}
                                        />
                                    )}
                                </div>
                                <div className='copy-div'>
                                    <p>Source</p>
                                    <div className='copy'>
                                        <div id='icon-bg'></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* {!(statePromise.length > 0) && (
                    <div className='not-found'><p>No Promise Found For This Ring</p></div>
                )} */}
            </div>
        </>
    );
};

export default PromiseRing;
