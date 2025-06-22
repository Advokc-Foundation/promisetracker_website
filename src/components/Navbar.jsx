import "../components/Navbar.css";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useState, useEffect } from "react";
import getCurrentFormattedDate from "../utils/currentTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal";
const Navbar = () => {
    const [clickedNav, setClickedNav] = useState('');
    const [isResized, setIsResized] = useState(window.innerWidth <= 720);
    const [toggleBurger, setToggleBurger] = useState(false);
    const location = useLocation();

    const handleNavState = () => {
        setToggleBurger(prev => !prev);
    };

    const handleJoinCohort =()=>{
        alert('Join cohort is currently closed now. It will be opened back soon.')
    }
      
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('presidentialTracker')) {
            setClickedNav('presidential');
        } else if (path.includes('legislativeTracker')) {
            setClickedNav('legislative');
        } else if (path.includes('stateTracker')) {
            setClickedNav('state');
        } else if (path.includes('promiseRing')) {
            setClickedNav('ring');
        } else if (path.includes('blog')) {
            setClickedNav('');
        }else if (path.includes('emailList')) {
            setClickedNav('');
        }else if (path.includes('promiseReminder')) {
            setClickedNav('');
        }else if (path.includes('aboutUs')) {
            setClickedNav('');
        }else if (path.includes('leaderboard')) {
            setClickedNav('');
        }else {
            setClickedNav('home');
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setIsResized(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);  

    const handleClickedNav = (data) => {
        setClickedNav(data);
        if (isResized) {
            setToggleBurger(false);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

     const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        }
    };


    return (
        <>
            <div className="navbar">
                {isOpen && <CustomModal overlayFunc={handleOverlayClick} action={'joinCo'}/> }
                <div className="title-contain">
                    {isResized &&
                        <div className='burger' onClick={handleNavState}>
                        {toggleBurger ? 
                            <FontAwesomeIcon icon={faXmark} size="1x" color="black" /> :
                            <FontAwesomeIcon icon={faBarsStaggered} size="1x" color="black" />
                        }
                        </div>
                    }
                    <div id="title-text">
                        <div id="logo-div"></div>
                        <div id="text-div"></div>    
                    </div>
                   
                </div>
               
                <div className={`con-div ${isResized && toggleBurger ? 'active-con' : ''}`}>
                    <div className="con-contain">
                        {!isResized &&
                             <div className="date-div">
                                {getCurrentFormattedDate()}
                            </div>
                        }
                       

                        <div className="menu-div">
                            <div className="sub-menu">
                                <div id="name">
                                    <Link className='ref-link' to='/home' onClick={() => handleClickedNav('home')}>Home</Link>    
                                </div>
                                {clickedNav === 'home' && <div id="highlight"></div>}
                            </div>
                            <div className="sub-menu">
                                <div id="name">
                                    <Link className='ref-link' to='/presidentialTracker' onClick={() => handleClickedNav('presidential')}>Presidential Tracker</Link>
                                </div>
                                {clickedNav === 'presidential' && <div id="highlight"></div>}
                            </div>
                            <div className="sub-menu">
                                <div id="name">
                                    <Link className='ref-link' to='/legislativeTracker' onClick={() => handleClickedNav('legislative')}>Legislative Tracker</Link>
                                </div>
                                {clickedNav === 'legislative' && <div id="highlight"></div>}
                            </div>
                            <div className="sub-menu">
                                <div id="name"> 
                                    <Link className='ref-link' to='/stateTracker' onClick={() => handleClickedNav('state')}>State Tracker</Link>                     
                                </div>
                                {clickedNav === 'state' && <div id="highlight"></div>}
                            </div>
                            <div className="sub-menu">
                                <div id="name"> 
                                    <Link className='ref-link' to='/promiseRing' onClick={() => handleClickedNav('ring')}>Promise Ring</Link>                     
                                </div>
                                {clickedNav === 'ring' && <div id="highlight"></div>}
                            </div>
                             {/* <div className="sub-menu">
                                <div id="name"> 
                                    <Link className='ref-link' to='' onClick={() => handleClickedNav('')}>Submit Tracker</Link>                     
                                </div>
                                {clickedNav === 'ring' && <div id="highlight"></div>}
                            </div> */}
                            {isResized && 
                                <div className="sub-menu">
                                    <div id="name" onClick={openModal}> 
                                        <Link className='ref-link' to='' onClick={() => handleClickedNav('cohort')}>Join Cohort</Link>                     
                                    </div>
                                    {clickedNav === 'cohort' && <div id="highlight"></div>}
                                </div>
                            }
                        </div>

                        {!isResized &&
                            <div className="btn-div">
                                <button onClick={openModal}>
                                    <p>Join our Cohort</p>
                                    <div></div>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
