import './Blog.css';
import TrackedPromise from './TrackedPromise';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StatusIcon from './statusIcon';
import formatDate from '../utils/formatDate';
import formatDateToSimple from '../utils/formatDateSimple';
import currentTime from '../utils/currentTime';
import TimelineSvg from './timelineSvg';
import StatusSvg from './StatusSvg';
import getCurrentFormattedDate from '../utils/currentTime';
import defaultBanner from '../assets/defaultBanner.png';
import CustomTimeline from './customTimeline';
import estimateRead from '../utils/readingTime';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import CustomModal from './CustomModal';
import ExtraTimeline from './extraTimeline';


const Blog = () => {
    const [promise, setPromise] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [promiseId, setPromiseId] = useState('');
    const [promiseStatus, setPromiseStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [updates, setUpdates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [forTimeline, setForTimeline] = useState([]);
    // const blogLocation = useLocation();

    // const proId = blogLocation.state.promiseId;

    const { id: proId } = useParams();

    const convertDisplayStatus = (status) => {
        const noUnderscore = status.replace(/_/g, ' ');
        const uppercased = noUnderscore.toUpperCase();
        return uppercased;
    };

      //Replacing underscores with space and first letter to uppercase
    const capitalize = (string)=>{
        const noUnderscore = string.replace(/_/g, ' ');
        const name = noUnderscore.charAt(0).toUpperCase() + noUnderscore.slice(1);
        return name;
    }

    const getSecondBackgroundStyle = (status)=>{
        const statusBackgrounds = {
        "compromised": "#FFA500",
        "stalled": "#FAE916",
        "kept": "#00BB03",
        "broken": "#E20102",
        "intheworks": "#0073E6",
        "notyetrated": "#D9D9D9"
        };
    if (!status) return statusBackgrounds["notyetrated"];
    const normalizedStatus = status.replace(/_/g, '').toLowerCase();
    const backgroundStyle = statusBackgrounds[normalizedStatus] || statusBackgrounds["notyetrated"];
    return backgroundStyle;   
    }

      const getSecondBackgroundStyleForUpdate = (status)=>{
        const statusBackgrounds = {
        "compromised": "#FFA500",
        "stalled": "#FAE916",
        "kept": "#00BB03",
        "broken": "#E20102",
        "intheworks": "#0073E6",
        "notyetrated": "#D9D9D9"
        };
    if (!status) return statusBackgrounds["notyetrated"];
    const normalizedStatus = status.replace(/_/g, '').toLowerCase();
    const backgroundStyle = statusBackgrounds[normalizedStatus] || statusBackgrounds["notyetrated"];
    return backgroundStyle;   
    }

    useEffect(() => {
        const fetchPromiseById = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://admin.promisetracker.ng/api/v1/promise-tracker/view/promise/${proId}`);
                const result = await response.json();
                setPromise(result.data);
                setAdmin(result.data.admin);
                setPromiseStatus(result.data.status);
                console.log(result.data);

                

                if(!result.data.updates){
                    setUpdates([]);
                    console.log('Update is empty');
                }else{
                    
                    const up = result.data.updates;
                    setUpdates(up);
                    setCurrentIndex(up.length-1);
                    const toTimeline=  up.map(update=> ({created_at:update.created_at}));
                   
                    setForTimeline(toTimeline);
                  
                }
               

            } catch (error) {
                console.error('Error fetching promise data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromiseById();
    }, [proId]);

    useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    function calculateDaysDifference(dateString) {
        const currentDate = new Date();
        const givenDate = new Date(dateString);
        const differenceInMillis = currentDate - givenDate;
        const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return differenceInDays;
    }

    const handleCopyLink = async (data)=>{
            try{
                    await navigator.clipboard.writeText(data);
                    alert('Link copied successfully');
            }catch(error){
                    alert('Error copying link');
            }
    }

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? updates.length - 1 : prevIndex - 1
        );
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === updates.length - 1 ? 0 : prevIndex + 1
        );
    };

    const changeFromTimeline =(data)=>{
        setCurrentIndex(data)
    }

    //Web share Api
const handleShare = async () => {
    const shareData = {
      title: 'Check out this promise!',
      text: 'I found this article interesting:',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        alert('Content shared successfully!');
      } else {
        alert('Your browser does not support the Web Share API.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

   

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

     const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        }
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
            <div className="blog-con">
                {/* {isOpen && <CustomModal overlayFunc={handleOverlayClick} action={"share"}/>} */}
                <div className='center-blog'>
                    <div className='main-blog'>
                        <div className='min-con'>
                            <div id='min-inner'>
                                <div className='min-title'>
                                    <div className='min-title1'>
                                        <p id='text1'>{`Posted ${formatDate(promise.created_at)}`}</p>
                                        <p id='text2'>{`Last Updated ${formatDate(promise.updated_at)}`}</p>
                                    </div>
                                    <div className='author-div'>
                                        <p className='author'>{admin.name}</p>
                                        <div className='blog-arrow11'></div>
                                    </div>
                                </div>
                                <div className='min-blog-title'>
                                    <div className='word-con1'>
                                        <p id='word-title'>{capitalize(promise.title)}</p>
                                    </div>
                                    <div className='genre-con'>
                                        <div className='g-con1'>
                                            <div id='div1'><p>{capitalize(promise.subject_area)}</p></div>
                                            <div id='div2'><p>{estimateRead(promise.promise_blog)} mins read</p></div>
                                        </div>
                                        <div className='g-con2' onClick={handleShare}>
                                            <div className='share-con'><p>Share</p></div>
                                            <div className='share-icon'></div>
                                        </div>
                                    </div>
                                    <div className='blog-status-div-con'>
                                        <div className='blog-status-div' style={{backgroundColor:getSecondBackgroundStyle(promiseStatus)}}>
                                            {promiseStatus && <StatusIcon id='icon' status={promiseStatus} />}
                                            {promiseStatus && <div id='word'><p>{convertDisplayStatus(promiseStatus)}</p></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='blog-display'>
                            <div className='blog-display-inner1'>
                                <div className='blog-pic' style={{ backgroundImage:`url(${promise?.promise_img || defaultBanner})`,borderTop:`8px solid ${getSecondBackgroundStyle(promiseStatus)}`}}></div>
                                <div className='blog-writings-con'>
                                    <div className='blog-writings'>
                                        {promise && (
                                            <div
                                                className="promise-content"
                                                dangerouslySetInnerHTML={{ __html: promise.promise_blog }}
                                            />
                                        )}
                                    </div>
                                    <div className='copy-link'>
                                        <div className='source'>
                                            <div id='icon'></div>
                                            <div id='words'>
                                                <p>SOURCE:</p>
                                                <div className='truncated-text'>
                                                    {promise.source}
                                                </div>
                                            </div>
                                            <div id='btn'>
                                                <div className='chain-icon'></div>
                                                <div className='copy-text' onClick={()=>handleCopyLink(promise.source)}><p>Copy link</p></div>
                                            </div>
                                        </div>
                                        <div className='share-btn' onClick={handleShare}>
                                            <p>Share Article</p>
                                            <div id='share-icon'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='timeline-con'>
                        <div className='floater-con'>
                            <div className='timeline'>
                                <p id='text1'>Timeline</p>
                                <p id='text2'>{`${calculateDaysDifference(promise.meter.tenure_date_start)} days since inauguration`}</p>
                                <div id='timelapse' >
                                    {/* <CustomTimeline/> */}
                                    <div className='stand-date'><p>{ `Today, ${getCurrentFormattedDate()}`}</p></div>
                                    <div className='arrow-time'></div>
                                    {/* <TimelineSvg status={promiseStatus}/>
                                    <StatusIcon className ='inside-time' status={promiseStatus} where={'inTime'}/> */}
                                    <ExtraTimeline pr={promiseStatus} up={forTimeline} func={changeFromTimeline}/>
                                  
                                </div>
                            </div>
                            <div className='updates'>
                                <div className='stag-con'>
                                    <div className='stag-div1'></div>
                                    <div className='stag-div2'>
                                        <div className='stag2'  style={{
                                                                backgroundColor: 
                                                                updates && updates.length > 0 && updates[currentIndex] 
                                                                    ? getSecondBackgroundStyleForUpdate(updates[currentIndex].status) 
                                                                    : '#D9D9D9'
                                                            }}></div>
                                        <div className='mimik-2'></div>
                                    </div>
                                </div>
                                <div className='up-con-main'>
                                    <div className='update-menu-con'>
                                        <div className='update-count'><p>{updates.length > 0 ? currentIndex + 1 : 0}/{updates.length} Updates</p></div>
                                        <div className='update-btn'>
                                            <div id='left' onClick={handleLeftClick} style={updates && updates[currentIndex] ? null : {
                                                    opacity: updates.body ? 1 : 0.5, 
                                                    pointerEvents: updates.body ? 'auto' : 'none',
                                                    }}></div>
                                            <div id='right' onClick={handleRightClick}
                                                        style={updates && updates[currentIndex] ? null : {
                                                            opacity: updates.body ? 1 : 0.5, 
                                                            pointerEvents: updates.body ? 'auto' : 'none',
                                                            }}
                                                    ></div>
                                        </div>
                                    </div>
                                    <div className='update-details'>
                                        <div className='date-up'  style={{
                                                                backgroundColor: 
                                                                updates && updates.length > 0 && updates[currentIndex] 
                                                                    ? getSecondBackgroundStyleForUpdate(updates[currentIndex].status) 
                                                                    : '#D9D9D9'
                                                            }}>
                                            <div id='start-div'><p>Update</p></div>
                                            <div id='date-up-con'><p className='up-date'>{updates[currentIndex] && updates[currentIndex].created_at 
                                                                                        ? formatDateToSimple(updates[currentIndex].created_at) 
                                                                                        : null}</p>
                                                                                </div>
                                        </div>
                                        <div className='up-body-con'>
                                            <div className='up-body-con-inner'>
                                                <div className='up-body'>
                                                    {updates && updates[currentIndex] && 
                                                        updates[currentIndex].blog ? (
                                                            <div
                                                            className="updates-content"
                                                            dangerouslySetInnerHTML={{ __html: updates[currentIndex].blog }}
                                                            />
                                                        ) : (
                                                            <p>No Updates Found</p>
                                                        )
                                                        }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='promise-tracker-key'>
                                <div className='tracker-key-inner'>
                                    <p className='key-title'>Promise Tracker Key</p>
                                    <div className='key-divs key-inw-bg'>
                                        <div className='key-icon icon-inw-bg'></div>
                                        <div className='text-div'>IN THE WORKS</div>
                                    </div>
                                    <div className='key-divs key-nyt-bg'>
                                        <div className='key-icon icon-nyt-bg'></div>
                                        <div className='text-div'>NOT YET RATED</div>
                                    </div>
                                    <div className='key-divs key-com-bg'>
                                        <div className='key-icon icon-com-bg'></div>
                                        <div className='text-div'><p>COMPROMISED</p></div>
                                    </div>
                                    <div className='key-divs key-stalls-bg'>
                                        <div className='key-icon icon-stall-bg'></div>
                                        <div className='text-div'>STALLED</div>
                                    </div>
                                    <div className='key-divs key-broken-bg'>
                                        <div className='key-icon icon-broke-bg'></div>
                                        <div className='text-div'>BROKEN</div>
                                    </div>
                                    <div className='key-divs key-kept-bg'>
                                        <div className='key-icon icon-kept-bg'></div>
                                        <div className='text-div'>KEPT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TrackedPromise />
        </>
    );
};

export default Blog;
