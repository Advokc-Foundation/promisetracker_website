import '../pages/homepage.css'
import StateIcon from '../components/StateSvg.jsx';
import TrackedPromise from '../components/TrackedPromise';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import {Chart as ChartJS,ArcElement, Tooltip, Legend} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2';
import { processString } from '../utils/stringOperations.js';
import defaultimage from '../assets/defaultimage.png';
import defaultBanner from '../assets/defaultBanner.png';
import CustomModal from '../components/CustomModal.jsx';
import Glance from '../components/Glance.jsx';
import VideoCon from '../components/VideoCon.jsx';

const homepage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const[activeFaq, setActiveFaq] = useState(0);
    const[clickedParam, setClickedParam] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const[iconClick, setIconClick]= useState(false);
    const[clickedStateIcon, setClickedStateIcon] = useState("");
    const[stateIconColor, setStateIconColor] = useState("#F9E5E5" );
    const [currentMeter, setCurrentMeter] = useState('presidential');
    const[meterDetails, setMeterDetails] = useState({name:'',totalCount:'',meterId:'',meterImage:''});
    const [status,setStatus] = useState({
        notRated: 0,
        kept: 0,
        inWorks: 0,
        stalled: 0,
        broken: 0,
        compromised: 0
    });
    const [proStats, setProStats] = useState([]);
    const [faqQuestion, setFaqQuestion] = useState(null);
    const [firstStudentScore, setFirstStudentScore] = useState(0);
    const [secondStudentScore, setSecondStudentScore] = useState(0);
    const [thridStudentScore, setThirdStudentScore] = useState(0);

    const [firstImage,setFirstImage]= useState('');
    const [secondImage, setSecondImage] = useState('');
    const [thirdImage, setThirdImage] = useState('');

    const[govName,setGovName] = useState('');
    const[numberPromise, setNumberPromise] = useState('');
    const [activeState, setActiveState] = useState(null);


    const[lagosTotalRingPr,setLagosTotalRingPr] = useState(null);
    const[enuguTotalRingPr,setEnuguTotalRingPr] = useState(null);
    const[oyoTotalRingPr,setOyoTotalRingPr] = useState(null);
    const[kwaraTotalRingPr,setKwaraTotalRingPr] = useState(null);

    const[lagosGovPrName,setLagosGovPrName] = useState('');
    const[enuguGovPrName,setEnuguGovPrName] = useState('');
    const[oyoGovPrName,setOyoGovPrName] = useState('');
    const[kwaraGovPrName,setKwaraGovPrName] = useState('');

      const[lagosGovImage,setLagosGovImage] = useState('');
    const[enuguGovImage,setEnuguGovImage] = useState('');
    const[oyoGovImage,setOyoGovImage] = useState('');
    const[kwaraGovImage,setKwaraGovImage] = useState('');

    const [presReminderBlog,setPresReminderBlog] = useState('');
    const [stateReminderBlog, setStateReminderBlog] = useState('doggy');

    const [presReminderPic,setPresReminderPic] = useState('');
    const [stateReminderPic, setStateReminderPic] = useState('');

    const[presData,setPresData] = useState([]);
    const[stateData,setStateData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

     const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        }
    };


    const handleStateClick =(data)=>{
        setClickedStateIcon(data);
        
    }

    const handleFaqClick = (index)=>{
        setActiveFaq(index);
        setClickedParam(index);
    }


    const handleSpan=(num)=>{
       
        setFaqQuestion(prev => prev === num ? null : num);
    }

    const handleCurrentMeter = (name)=>{
        setCurrentMeter(name);

    }

      useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);

    // initial fetching student scores
    useEffect(()=>{

   
        const fetchPositions = async ()=>{
            setIsLoading(true)

            try{
                
                const statsResponse= await fetch(`${API_BASE_URL}/total/promise/tracked`);
                const stats = await statsResponse.json();
                // console.log(stats.data);
                setProStats(stats.data);
                
                const presResponse = await fetch(`${API_BASE_URL}/promise/reminders/fetch/presidential`);
                const stateResponse = await fetch(`${API_BASE_URL}/promise/reminders/fetch/state`);

                const stateResult = await stateResponse.json();
                const presResult = await presResponse.json();


                setPresData(presResult.data);
                setStateData(stateResult.data); 

            
            }catch(error){
                console.error("Error fetching positions:", error);
            } finally {
                setIsLoading(false);
            }
            
            
            }

        
       
        fetchPositions();
    },[])


    //Fetching the meter status by meter name
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(currentMeter === "state"){
                        const response = await fetch(`${API_BASE_URL}/${currentMeter}/anambra`);
                        const result = await response.json();
                        const meterName = result.data.current_meter.meter_name;
                        const promiseCount = result.data.promise_count;
                        const meter_Image = result.data.current_meter.meter_img;
                        const meter_Id = result.data.current_meter.id;
                        setMeterDetails({name:meterName,totalCount:promiseCount,meterId:meter_Id,meterImage:meter_Image});
                        setStatus({
                            notRated: result.data.not_rated || 0,
                            kept: result.data.kept || 0,
                            inWorks: result.data.in_works || 0,
                            stalled: result.data.stalled || 0,
                            broken: result.data.broken || 0,
                            compromised: result.data.compromised || 0
                        });
                }else{
                    const response = await fetch(`${API_BASE_URL}/${currentMeter}/lower-chamber`);
                        const result = await response.json();
                        const meterName = result.data.current_meter.meter_name;
                        const promiseCount = result.data.promise_count;
                        const meter_Image = result.data.current_meter.meter_img;
                        const meter_Id = result.data.current_meter.id;
                        setMeterDetails({name:meterName,totalCount:promiseCount,meterId:meter_Id,meterImage:meter_Image});
                        setStatus({
                            notRated: result.data.not_rated || 0,
                            kept: result.data.kept || 0,
                            inWorks: result.data.in_works || 0,
                            stalled: result.data.stalled || 0,
                            broken: result.data.broken || 0,
                            compromised: result.data.compromised || 0
                        });
                }
              

            
      
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    },[currentMeter]);


    //fetching states details for promise ring
   
       useEffect(()=>{
        const fetchStateDetails = async ()=>{
            try{
                
                const reponse =  await fetch(`${API_BASE_URL}/leaderboard/top/student`);
                const result = await reponse.json();
                const data = result.data;

                const lagosResponse = await fetch(`${API_BASE_URL}/all/promise-ring/fetch/lagos`);
                const oyoResponse = await  fetch(`${API_BASE_URL}/all/promise-ring/fetch/oyo`);
                const enuguResponse = await  fetch(`${API_BASE_URL}/all/promise-ring/fetch/enugu`);
                const kwaraResponse = await  fetch(`${API_BASE_URL}/all/promise-ring/fetch/kwara`);

                const lagosResult = await lagosResponse.json();
                const oyoResult = await oyoResponse.json();
                const enuguResult = await enuguResponse.json();
                const kwaraResult = await kwaraResponse.json();

                
                const firstImage = data[0]?.img || null;
                const secondImage = data[1]?.img || null;
                const thirdImage = data[2]?.img || null;

                const first = data [0]?.total_score || 0;
                const second = data [1]?.total_score || 0;
                const third = data [2]?.total_score || 0;

                //Implement student images
                setFirstImage(firstImage);
                setSecondImage(secondImage);
                setThirdImage(thirdImage);

                setFirstStudentScore(first);
                setSecondStudentScore(second);
                setThirdStudentScore(third);

                if(lagosResult.data.length === 0){
                    setLagosGovPrName('');
                    setLagosTotalRingPr(0);
                    setLagosGovImage(null);
                }else{
                    const data = lagosResult.data;
                    setLagosGovPrName( data[0].meter.name);
                    setLagosTotalRingPr(data.length);
                    setLagosGovImage(data[0].meter.meter_img);
                }

                 if(oyoResult.data.length === 0){
                    setOyoGovPrName('');
                    setOyoTotalRingPr(0);
                    setOyoGovImage(null);
                }else{
                    const data = oyoResult.data;
                    setOyoGovPrName( data[0].meter.name);
                    setOyoTotalRingPr(data.length);
                    setOyoGovImage(data[0].meter.meter_img);
                }

                 if(kwaraResult.data.length === 0){
                    setKwaraGovPrName('');
                    setKwaraTotalRingPr(0);
                    setKwaraGovImage(null);
                }else{
                    const data = kwaraResult.data;
                    setKwaraGovPrName( data[0].meter.name);
                    setKwaraTotalRingPr(data.length);
                    setKwaraGovImage(data[0].meter.meter_img);
                }

                 if(enuguResult.data.length === 0){
                    setEnuguGovPrName('');
                    setEnuguTotalRingPr(0);
                    setEnuguGovImage(null);
                }else{
                    const data = enuguResult.data;
                    setEnuguGovPrName( data[0].meter.name);
                    setEnuguTotalRingPr(data.length);
                    setEnuguGovImage(data[0].meter.meter_img);
                }
            
            
                  


                
            }catch(error){

            }
        }

        fetchStateDetails();

    },[])

    


     const handleStClick = (state) => {
        setActiveState(state);
    };



    const { notRated, kept, inWorks, stalled, broken, compromised } = status;
    const {name,totalCount,meterId,meterImage} = meterDetails;

    
// BarChart Operations
        ChartJS.register(ArcElement, Tooltip, Legend);
        const data = {
        labels: ['Not Rated', 'In Works', 'Stalled', 'Compromised', 'Kept', 'Broken'],
        datasets: [
            {
                data: [notRated, inWorks, stalled, compromised, kept, broken],
                backgroundColor: [
                    '#D9D9D9',
                    "#0073E6",
                    '#FAE916',
                    '#FFA500',
                    '#00BB03',
                    '#E20102'
                ],
                hoverBackgroundColor: [
                    '#D9D9D9',
                    "#0073E6",
                    '#FAE916',
                    '#FFA500',
                    '#00BB03',
                    '#E20102'
                ],
                borderColor:[
                   '#D9D9D9',
                    "#0073E6",
                    '#FAE916',
                    '#FFA500',
                    '#00BB03',
                    '#E20102'
                ]
            }
        ]
    };

    const options = {
        responsive: false,  // Makes the chart responsive to container size
        maintainAspectRatio: false,  
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
            enabled: true, 
            },
            datalabels: {
            display: true,
            color: 'white',
            formatter: (value, ctx) => {
                const total = ctx.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
            }
        }
        },
    };

        if (isLoading) {
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
            <div className='page-container'>
                {isOpen && <CustomModal overlayFunc={handleOverlayClick} action={'joinCo'}/> }
                
                <div className='first-inner'>
                    <div className='emailList-div'>
                        <div className='inner-email1'>
                            <p>Nigeria's <span id='design-span'>foremost</span> <span id='for-mobile'> and <span id='design-span'>unbiased</span></span> <span id='promise-span'>promise tracker</span> </p>
                        </div>
                        <div className='inner-email2'> 
                          <div className='email2-con'>
                              <div id='image-dv'>
                                
                              </div>
                            <div id='join-div'>
                                <p>Join our email list to get daily updates on promises</p></div>
                                <div className='list-div'>
                                    <Link className="link-email" to='/emailList'>
                                        <div>Join Email List</div>
                                        <div id='arrow1'></div>   
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='meter-div'>
                        <div className='meter-container'>
                            <div className='meter-tog'>
                                <div id='outer'>
                                    <div className={`tog ${currentMeter === 'legislative'? 'activetog':''}`} onClick={()=> handleCurrentMeter('legislative')}><p>Legislative</p></div>
                                    <div className={`tog ${currentMeter === 'presidential'? 'activetog':''}`} onClick={()=> handleCurrentMeter('presidential')}><p>Presidential</p></div>
                                    <div className={`tog ${currentMeter === 'state'? 'activetog':''}`} onClick={()=> handleCurrentMeter('state')}><p>State</p></div>
                                </div>
                            </div>
                            <div className='meter'>
                                <div id='meter-title'>
                                     <div className='meter-word'><p>{processString(name)}</p></div>
                                
                                </div>
                                <div id='promise-count'>
                                    <div className='inner-promise'>
                                         <div className='promise-title'><p>Promises</p></div>
                                         <div className='promise-number'>
                                            <div id='icon'></div>
                                            <div id='number'>{totalCount}</div>
                                         </div>
                                    </div>
                                   
                                </div>
                                <div id='bar-chart'>
                                    <div className='bar-div'>
                                    <div style={{zIndex:3}}>
                                         <Doughnut data={data} options={options} width={450} height={225} />
                                    </div>
                                     
                            
                                     <div className='doughnut-img' style={{backgroundImage:`url(${meterImage || defaultimage})`,
                                                                            backgroundSize:'cover'
                                            }}></div>
                                      
                                    
                                    </div>
                                </div>
                                <div id='promise-display'>
                                    <div className='details-div1'>
                                        <div className='full-mean'>
                                            <p className='full-tl fullny'>Not yet rated</p>
                                            <p className='full-txt'>Every promise begins at this level and retains this rating until there is evidence of progress or evidence that the promise is stalled.</p>
                                        </div>
                                        <div id='color-allocate'>
                                            <div className='color-circle circle1'></div>
                                        </div>
                                        <div id='indetails'>
                                            <div className='term-div'><p>Not Yet Rated</p></div>
                                            <div className='term-count'><p>{notRated}</p></div>
                                        </div>
                                    </div>
                                    <div className='details-div1'>
                                          <div className='full-mean'>
                                            <p className='full-tl fullinw'>In the Works</p>
                                            <p className='full-txt'>Promises that are in progress and demonstrating tangible advancements.</p>
                                        </div>
                                         <div id='color-allocate'>
                                             <div className='color-circle circle2'></div>
                                         </div>
                                        <div id='indetails'>
                                            <div className='term-div'><p>In The Works</p></div>
                                            <div className='term-count'><p>{inWorks}</p></div>
                                        </div>
                                    </div>
                                    <div className='details-div1'>
                                        <div className='full-mean'>
                                            <p className='full-tl fullsta'>Stalled</p>
                                            <p className='full-txt'>There is no movement on the promise, perhaps because of limitations on money, opposition from lawmakers or a shift in priorities.</p>
                                        </div>
                                         <div id='color-allocate'>
                                             <div className='color-circle circle3'></div>
                                         </div>
                                        <div id='indetails'>
                                            <div className='term-div'><p>Stalled</p></div>
                                            <div className='term-count'><p>{stalled}</p></div>
                                        </div>
                                    </div>
                                    <div className='details-div1'>
                                        <div className='full-mean'>
                                            <p className='full-tl fullcom'>Compromised</p>
                                            <p className='full-txt'>Promises earn this rating when what is achieved is less than what is promised, even if significant progress is made towards achieving the goal.</p>
                                        </div>
                                         <div id='color-allocate'>
                                             <div className='color-circle circle4'></div>
                                         </div>
                                        <div id='indetails'>
                                            <div className='term-div'><p>Compromised</p></div>
                                            <div className='term-count'><p>{compromised}</p></div>
                                        </div>
                                    </div>
                                    <div className='details-div1'>
                                          <div className='full-mean'>
                                            <p className='full-tl fullkt'>Kept</p>
                                            <p className='full-txt'>Promises earn this rating when the original promise is mostly or completely fulfilled.</p>
                                        </div>
                                         <div id='color-allocate'>
                                             <div className='color-circle circle5'></div>
                                         </div>
                                        <div id='indetails'>
                                            <div className='term-div'><p>Kept</p></div>
                                            <div className='term-count'><p>{kept}</p></div>
                                        </div>
                                    </div>
                                    <div className='details-div1'>
                                        <div className='full-mean'>
                                            <p className='full-tl fullbr'>Broken</p>
                                            <p className='full-txt'>The promise remains unfulfilled, perhaps because of executive inaction or insufficient backing from the legislative or other essential groups involved in the fulfilment.</p>
                                        </div>
                                        <div id='color-allocate'>
                                             <div className='color-circle circle6'></div>
                                        </div>
                                        <div id='indetails'>
                                            <div className='term-div'><p>Broken</p></div>
                                            <div className='term-count'><p>{broken}</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div id='view'>
                                    <div className='view-con'>
                                        <div id='fluent-arrow'></div>
                                        <div id='view-words'><Link className='view-word-link' to={{pathname: `/${currentMeter}Tracker`,state: { meterId: meterId }}}>{`View ${processString(name)}`}</Link></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                       
                    </div>

                </div>

                <Glance/>                                                

                <div className='promise-ring-ban'>
                    <div className='ring-ban'>
                        <div id='inner-ring-ban'>
                            <div className='promise-words-con'>
                                <div className='promise-words2'>
                                    <p id='p1'>Promise <span className='ring-span'>Ring</span></p>
                                    <p id='p2'>Through our Promise Ring, we shine a spotlight on some of the most important promises made by state governors across Nigeria. Unlike the Promise Tracker, which is more specialized, we update our audience, remind officials, and advocate for the fulfilment of these promises.</p>
                                </div>
                            </div>
                            <div className='state-icon-con'>
                                <div className='st-name'>
                                    <div className='map-details-display'>
                                        <div id='map-image' onClick={()=>handleStateClick('enugu')}>
                                          <StateIcon  state='enugu' onClick={handleStClick} activeState={activeState} />
                                        </div>
                                        <div id='map-name'> 
                                            <Link className="toState"  to={{pathname: `/promiseRing`,state: { stateName: "Enugu" }}}>
                                                <p className='st-letter'>Enugu</p>
                                            </Link>
                                            <div className='more-state-arrow'></div>
                                        </div>
                                    </div>
                                  {clickedStateIcon === 'enugu' && 
                                    <div className='gov-details'>
                                        <div id='gov-image'>
                                            <div className='gimg' style={{ backgroundImage:`url(${enuguGovImage || defaultimage})`}}>

                                            </div>
                                        </div>
                                        <div id='gov-details-word'>
                                            <p><span>{enuguGovPrName}</span> Governor of Enugu has {enuguTotalRingPr} promises in the promise ring</p>
                                        </div>
                                        <div id='view-promise'>
                                            <Link className="link-tostate" to={{pathname: `/promiseRing`,state: { stateName: "Enugu" }}}>
                                                    <p>View promise ring</p>
                                            </Link>
                                            
                                            <div className='brown-arrow'></div>
                                        </div>

                                    </div>
                                  } 
                                </div>
                                <div className='st-name'>
                                     <div className='map-details-display'>
                                        <div id='map-image' onClick={()=>handleStateClick('kwara')}>
                                             <StateIcon state='kwara' onClick={handleStClick} activeState={activeState}  />
                                        </div>
                                        <div id='map-name'> 
                                            <Link className="toState" to={{pathname: `/promiseRing`,state: { stateName: "Kwara" }}}>
                                                <p className='st-letter'>Kwara</p>
                                            </Link>
                                            <div className='more-state-arrow'></div>
                                        </div>
                                    </div>
                                  {clickedStateIcon === 'kwara' && 
                                    <div className='gov-details'>
                                        <div id='gov-image'>
                                            <div className='gimg' style={{ backgroundImage:`url(${kwaraGovImage || defaultimage})`}}>
                                                
                                            </div>
                                        </div>
                                        <div id='gov-details-word'>
                                            <p><span>{kwaraGovPrName}</span> Governor of Kwara has {kwaraTotalRingPr} promises in the promise ring</p>
                                        </div>
                                        <div id='view-promise'>
                                            <Link className="link-tostate" to={{pathname: `/promiseRing`,state: { stateName: "Kwara" }}}>
                                                     <p>View promise ring</p>
                                            </Link>  
                                            <div className='brown-arrow'></div>
                                        </div>

                                    </div>
                                  } 
                                </div>
                                <div className='st-name'>
                                     <div className='map-details-display'>
                                        <div className='lagos1-div' onClick={()=>handleStateClick('lagos')}>
                                             <StateIcon state='lagos' onClick={handleStClick} activeState={activeState} />
                                        </div>
                                        <div id='map-name'> 
                                            <Link className="toState" to={{pathname: `/promiseRing`,state: { stateName: "Lagos" }}}>
                                                 <p className='st-letter'>Lagos</p>
                                            </Link>
                                            <div className='more-state-arrow'></div>
                                        </div>
                                    </div>
                                  {clickedStateIcon === 'lagos' && 
                                    <div className='gov-details'>
                                        <div id='gov-image'>
                                            <div className='gimg' style={{ backgroundImage:`url(${lagosGovImage || defaultimage})`}}>
                                                
                                            </div>
                                        </div>
                                        <div id='gov-details-word'>
                                            <p><span>{lagosGovPrName}</span> Governor of Lagos has {lagosTotalRingPr} promises in the promise ring</p>
                                        </div>
                                        <div id='view-promise'>
                                           <Link className="link-tostate" to={{pathname: `/promiseRing`,state: { stateName: "Lagos" }}}>
                                             <p>View promise ring</p>
                                           </Link>                  
                                            <div className='brown-arrow'></div>
                                        </div>

                                    </div>
                                  } 
                                </div>
                                <div className='st-name'>
                                     <div className='map-details-display'>
                                        <div id='map-image' onClick={()=>handleStateClick('oyo')}>
                                             <StateIcon state='oyo' onClick={handleStClick} activeState={activeState}/>
                                        </div>
                                        <div id='map-name'> 
                                            <Link className="toState" to={{pathname: `/promiseRing`,state: { stateName: "Oyo" }}} >
                                                 <p className='st-letter'>Oyo</p>
                                            </Link>
                                            <div className='more-state-arrow'></div>
                                        </div>
                                    </div>
                                  {clickedStateIcon === 'oyo' && 
                                    <div className='gov-details'>
                                        <div id='gov-image'>
                                            <div className='gimg' style={{ backgroundImage:`url(${oyoGovImage || defaultimage})`}}>
                                                
                                            </div>
                                        </div>
                                        <div id='gov-details-word'>
                                            <p><span>{oyoGovPrName}</span> Governor of Oyo has {oyoTotalRingPr} promises in the promise ring</p>
                                        </div>
                                        <div id='view-promise'>
                                            <Link className="link-tostate" to={{pathname: `/promiseRing`,state: { stateName: "Oyo" }}}>
                                                 <p>View promise ring</p>
                                            </Link>
                                           
                                            <div className='brown-arrow'></div>
                                        </div>

                                    </div>
                                  } 
                                </div>
                            </div>
                        </div>
                        <div id='more-state'>
                            <div >
                                 <Link className="to-state" to='/promiseRing'>Browse More States</Link> 
                            </div>
                            <div className='more-state-arrow'></div>
                        </div>

                    </div>

                </div>

                <div className='banner-con'>
                    <div className='banner-inner'>
                        <div className='ban ban1-bg'>
                            <div className='ban1'>
                                <div id='inner-ban1'>
                                    <div className='ban-title'><p>Promise Reminder</p></div>
                                    <div className='ban-words'><p>AdvoKC reminds elected officials of their promises when there is no evidence of progress or when they have stalled.</p></div>
                                    <Link className="remind-lk" to={'/promiseReminder'}>
                                        <div className='ban-buttons'>
                                            <span className='ban-span1'></span>
                                            <div className='ban-link'><p>View Reminders</p></div>
                                        </div>
                                    </Link>
                                   
                                </div>
                                
                            </div>
                            <div className='ban2'>
                                <div className='rel-con'>
                                    <div className='relative-ban rb1'>
                                        <div className='bell'></div>
                                        <div className='promise-bg rel-inner1' style={{backgroundImage:`url(${stateData[0]?.promise.promise_img || defaultBanner})`}}></div>
                                        <div className='promise-word'>  
                                            <div
                                            className="remind-content"
                                                dangerouslySetInnerHTML={{ __html: stateData[0]?.blog}}
                                            />
                                        </div>
                                    </div>
                                    <div className='relative-ban rb2'>
                                        <div className='bell'></div>
                                        <div className='promise-bg rel-inner2' style={{backgroundImage:`url(${presData[0]?.promise.promise_img || defaultBanner})`}}></div>
                                        <div className='promise-word'>
                                            <div
                                            className="remind-content"
                                                dangerouslySetInnerHTML={{ __html: presData[0]?.blog}}
                                            />
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className='ban ban2-bg'>
                            <div className='ban1'>
                                 <div id='inner-ban1'>
                                    <div className='ban-title'><p>Leaderboard</p></div>
                                    <div className='ban-words'><p>View the top-performing members from our ongoing cohort of advocates who are enthusiastic about being changemakers and contributing to advancing democracy through civic engagement.</p></div>
                                    <Link className= 'remind-lk' to={"/leaderboard"}>
                                        <div className='ban-buttons1'>
                                            <span className='ban-span1'></span>
                                            <div className='ban-link'><p>View Leaderboard</p></div>
                                        </div>
                                    </Link>
                                    
                                </div>
                            </div>
                            <div className='ban2'>
                                <div className='trape-shapes'>
                                    <div className='trape-con tcon1'>
                                        <div className='position-pic'>
                                            <div id='appear-pic1' style={{ backgroundImage:`url(${secondImage || defaultimage})`}}>

                                            </div>
                                        </div>
                                        <div className='exp-trape1'>

                                        </div>
                                        <div className='skewed-div sk1'>
                                                <div className='score-div'>{secondStudentScore}</div>
                                                <div className='position-div secondpo'></div>
                                        </div>
                                    </div>
                                    <div className='trape-con tcon2'>
                                        <div className='position-pic first-po'>
                                            <div className='first-po-pic'>

                                            </div>
                                            <div className='first-appear-div' style={{ backgroundImage:`url(${firstImage || defaultimage})`}}>

                                            </div>
                                        </div>
                                        <div className='exp-trape'>

                                        </div>
                                        <div className='skewed-div sk2'>
                                                <div className='score-div'>{firstStudentScore}</div>
                                                <div className='fposition-div firstpo'></div>
                                        </div>
                                    </div>
                                    <div className='trape-con tcon3'>
                                        <div className='position-pic'>
                                            <div id='appear-pic3' style={{ backgroundImage:`url(${thirdImage || defaultimage})`}}>

                                            </div>
                                        </div>
                                        <div className='exp-trape'>

                                        </div>
                                        <div className='skewed-div sk3'>
                                             <div className='score-div'>{thridStudentScore}</div>
                                            <div className='position-div thirdpo'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                 <TrackedPromise/>
                <VideoCon isFunc={openModal}/>

                <div className='our-partner'>
                        <div className='partner-words'>
                            <div className='partner-word-con'>
                                <div className='partner-words-title'><p>Our <span>partners</span></p></div>
                                <div className='partner-words-writing'>Our incredible achievements within the civic space have been <br /> <span>possible with support from phenomenal partners</span> </div>
                            </div>                          
                        </div>
                        <div className='partner-icons'>
                            <div className='partner-icon-con'>
                                <div className='p-icon icon1-bg'></div>
                                <div className='p-icon icon2-bg' ></div>
                                <div className='p-icon icon3-bg'></div>
                                <div className='p-icon icon4-bg'></div>
                                <div className='p-icon icon5-bg'></div>
                                <div className='p-icon icon6-bg'></div>
                                <div className='p-icon icon7-bg'></div>
                            </div>
                          
                        </div>
                </div>


            
                <div className='faq-con' id='faq-section'>
                    <div className='faq-inner'>
                        <div className='faq-inner2'>
                            <div id='inner-toggle1'>
                                <div id='inner-toggle1-wrap'>
                                    <div className={`btn-togs ${activeFaq === 0 ? 'active' : ''}`} onClick={()=>handleFaqClick(0)} ><p>Promise Tracker</p></div>
                                    <div className={`btn-togs ${activeFaq === 1 ? 'active' : ''}`} onClick={()=>handleFaqClick(1)} ><p>Promise Ring</p></div>
                                    <div className={`btn-togs ${activeFaq === 2 ? 'active' : ''}`} onClick={()=>handleFaqClick(2)} ><p>Learning Resource</p></div>
                                </div>
                            </div>

                            {clickedParam === 0 &&
                            <div id='inner-toggle2'>
                                <div className='question-con'>
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>Is the Promise Tracker Government backed?</p></div>
                                            <span className={`icon-span ${faqQuestion === '1' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('1')}></span>
                                        </div> 
                                        {faqQuestion=== "1" &&
                                            <div className='ans-con'>
                                                <p>No, the Promise Tracker is an independent platform that aims to provide unbiased and transparent information to the public.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div>                          
                                     <div className='question-title'>
                                          <div className='question1'>
                                            <div> <p>What is the purpose of the Promise Tracker?</p></div>
                                            <span className={`icon-span ${faqQuestion === "2" ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('2')}></span>
                                        </div> 
                                        { faqQuestion === '2' &&
                                            <div className='ans-con'>
                                                <p>The Promise Tracker monitors and reports on the promises made by elected officials, providing transparency and accountability in governance.</p>
                                            </div> 
                                        
                                        }
                                    </div>
                                     <div className='question-title'>
                                           <div className='question1'>
                                            <div> <p>How do you track promises made by elected officials?</p></div>
                                            <span className={`icon-span ${faqQuestion === '3' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('3')}></span>
                                        </div> 
                                        { faqQuestion === '3' &&
                                            <div className='ans-con'>
                                                <p>We collect data from policy documents, manifestos, speeches and debates, then analyse the progress and update the tracker accordingly.</p>
                                            </div> 
                                        
                                        }
                                    </div>
                                     <div className='question-title'>
                                           <div className='question1'>
                                            <div> <p> Which officials and promises are tracked on this platform?</p></div>
                                            <span className={`icon-span ${faqQuestion === '4' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('4')}></span>
                                        </div> 
                                        { faqQuestion === '4' &&
                                            <div className='ans-con'>
                                                <p>We track promises made by Nigeria's president, state governors, and the House of Representatives.</p>
                                            </div> 
                                        
                                        }
                                    </div>
                                     <div className='question-title'>
                                          <div className='question1'>
                                            <div> <p>How often is the information on the tracker updated?</p></div>
                                            <span className={`icon-span ${faqQuestion === '5' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('5')}></span>
                                        </div> 
                                        { faqQuestion === "5" &&
                                            <div className='ans-con'>
                                                <p>The tracker is updated regularly as new information becomes available and as we assess the progress of promises.</p>
                                            </div> 
                                        
                                        }
                                    </div>
                                    <div className='question-title'>
                                          <div className='question1'>
                                            <div> <p>Can users contribute information/promises to the tracker?</p></div>
                                            <span className={`icon-span ${faqQuestion === '6' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('6')}></span>
                                        </div> 
                                        { faqQuestion === "6" &&
                                            <div className='ans-con'>
                                                <p>Yes, users can submit verified information or evidence related to promises, which our team will review and potentially incorporate into the tracker.</p>
                                            </div> 
                                        
                                        }
                                    </div>
                                 
                                      <div className='question-title' id='last-div'>
                                            <div className='question1'>
                                                <div> <p>How can I stay informed about the progress of promises?</p></div>
                                                <span className={`icon-span ${faqQuestion === '7' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('7')}></span>
                                            </div>
                                            {
                                                faqQuestion === '7' &&
                                                <div className='ans-con'>
                                                    <p>You can subscribe to our newsletter to receive regular updates or follow our social media channels for the latest information.</p>
                                                </div>  
                                            }
                                              
                                    </div>
                                </div>
                            </div>}
                                 {clickedParam === 1 &&
                            <div id='inner-toggle2'>
                                <div className='question-con'>
                                   <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p> Is the Promise Ring Government backed?</p></div>
                                            <span className={`icon-span ${faqQuestion === '11' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('11')}></span>
                                        </div> 
                                        {faqQuestion=== "11" &&
                                            <div className='ans-con'>
                                                <p>No, the Promise Ring is an independent platform that aims to provide unbiased and transparent information to the public.</p>
                                            </div>  
                                        }
                                                                                                                 
                                    </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p> How is the state tracker different from the promise ring?</p></div>
                                            <span className={`icon-span ${faqQuestion === '12' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('12')}></span>
                                        </div> 
                                        {faqQuestion=== "12" &&
                                            <div className='ans-con'>
                                                <p>The state tracker is similar to the promise ring in that they are both tools for monitoring political accountability but the state tracker is more specialised.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>How does the Promise Ring ensure accuracy in tracking?</p></div>
                                            <span className={`icon-span ${faqQuestion === '13' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('13')}></span>
                                        </div> 
                                        {faqQuestion=== "13" &&
                                            <div className='ans-con'>
                                                <p>The platform gathers data from official sources, media reports, public records and physical tracking to verify the progress of promises.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>How frequently is the data updated?</p></div>
                                            <span className={`icon-span ${faqQuestion === '14' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('14')}></span>
                                        </div> 
                                        {faqQuestion=== "14" &&
                                            <div className='ans-con'>
                                                <p> Data is updated regularly based on the latest available information and public reports.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>Can users contribute information to the Promise Ring?</p></div>
                                            <span className={`icon-span ${faqQuestion === '15' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('15')}></span>
                                        </div> 
                                        {faqQuestion=== "15" &&
                                            <div className='ans-con'>
                                                <p>Yes, users can submit verified information or evidence related to promises, which our team will review and potentially incorporate into the tracker.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                      <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>Which officials and promises are tracked through the promise ring?</p></div>
                                            <span className={`icon-span ${faqQuestion === '16' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('16')}></span>
                                        </div> 
                                        {faqQuestion=== "16" &&
                                            <div className='ans-con'>
                                                <p>We track promises made by state governors in over 12 states in Nigeria including Lagos, Abia, Kaduna and Oyo states.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div>
                                     <div className='question-title' id='last-div'>
                                        <div className='question1'>
                                            <div> <p>How can I stay informed about the progress of promises?</p></div>
                                            <span className={`icon-span ${faqQuestion === '17' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('17')}></span>
                                        </div> 
                                        {faqQuestion=== "17" &&
                                            <div className='ans-con'>
                                                <p>You can subscribe to our newsletter for regular updates or follow our social media channels for the latest information.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                </div>
                            </div>}
                                 {clickedParam === 2 &&
                            <div id='inner-toggle2'>
                                <div className='question-con'>
                                    <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>What is the purpose of the learning resource?</p></div>
                                            <span className={`icon-span ${faqQuestion === '21' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('21')}></span>
                                        </div> 
                                        {faqQuestion=== "21" &&
                                            <div className='ans-con'>
                                                <p>The learning resource aims to educate young advocates on civic matters through webinars and knowledge-sharing sessions.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>How long does each learning cohort last?</p></div>
                                            <span className={`icon-span ${faqQuestion === '22' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('22')}></span>
                                        </div> 
                                        {faqQuestion=== "22" &&
                                            <div className='ans-con'>
                                                <p>Each cohort runs for about 5 months.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>Who are the instructors for the program?</p></div>
                                            <span className={`icon-span ${faqQuestion === '23' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('23')}></span>
                                        </div> 
                                        {faqQuestion=== "23" &&
                                            <div className='ans-con'>
                                                <p>The instructors are leaders in the civic space and advocates of good governance, civic engagement and participatory democracy.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p> How do I enroll in the program?</p></div>
                                            <span className={`icon-span ${faqQuestion === '24' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('24')}></span>
                                        </div> 
                                        {faqQuestion=== "24" &&
                                            <div className='ans-con'>
                                                <p>You can enroll by visiting and filling out the application form available on our website. Further instructions will be shared with successful applicants.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>How is learner progress tracked throughout the course?</p></div>
                                            <span className={`icon-span ${faqQuestion === '25' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('25')}></span>
                                        </div> 
                                        {faqQuestion=== "25" &&
                                            <div className='ans-con'>
                                                <p>Progress is tracked via performance in quizzes, course completion, and engagement in community activities.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                       <div className='question-title'>
                                        <div className='question1'>
                                            <div> <p>Who can participate in the program?</p></div>
                                            <span className={`icon-span ${faqQuestion === '26' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('26')}></span>
                                        </div> 
                                        {faqQuestion=== "26" &&
                                            <div className='ans-con'>
                                                <p>The program is designed for young advocates or people who are enthusiastic about being change-makers in their communities.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                     <div className='question-title' id='last-div'>
                                        <div className='question1'>
                                            <div> <p>Is there a certification offered upon completion of the program?</p></div>
                                            <span className={`icon-span ${faqQuestion === '27' ? 'minusBg':'plusBg'} `} onClick={()=> handleSpan('27')}></span>
                                        </div> 
                                        {faqQuestion=== "27" &&
                                            <div className='ans-con'>
                                                <p>Yes, participants who complete the courses and meet the program requirements may receive a certificate of completion.</p>
                                            </div>  
                                        }
                                                                                                                 
                                     </div> 
                                </div>
                            </div>}
                           
                        </div>
                       
                    </div>

                </div>
        

            </div>
        
        </>
      );
}
 
export default homepage;