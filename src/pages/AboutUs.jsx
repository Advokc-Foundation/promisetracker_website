import './AboutUs.css'
import PeopleCard from '../components/peopleCard';
import { useEffect,useState } from 'react';
import Glance from '../components/Glance';
import VideoCon from '../components/VideoCon';
import CustomModal from '../components/CustomModal';
import abiola from '../assets/team/AbiolaDurodola.jpeg';
import onye from '../assets/team/OnyinyeEdyson.jpeg';
import dare from '../assets/team/DareOlatunde.png';
import habib from '../assets/team/HabibSheidu.jpg';



const AboutUs = () => {
     const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

     const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        }
    };

    useEffect(() => {
       
         window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return ( 
        <div className='about-con'>
            {isOpen && <CustomModal overlayFunc={handleOverlayClick} action={'joinCo'}/> }
            <div className='upper-about'>
                <div className='title-di'>
                    <p id='titl'>About <span className='usm'>us</span></p>
                    <p className='abt-us'>Advokc Foundation is a community of active citizens committed to a Nigeria where political promises are more than just words. Our platform promotes transparency and accountability by tracking the commitments made by elected officials and holding them to the standards they set. Through real-time data, user feedback, and unbiased reporting, we empower citizens, advocacy groups, and policymakers to see the true progress—or lack thereof—of political promises.</p>
                </div>
                <div className='title-pic-di'>
                    <div className='abt-f f1'></div>
                    <div className='abt-f f2'></div>
                </div>
            </div>
            <Glance/>
            <div className='about-con-inner'>

                    <div className='we-details'>
                        <div className='we-details-inner'>
                            <div className='we-text-div'>
                                <p className='who-text'>Who we <span className='first-who'>are</span></p>
                                <p className='words-re'>Through Promise Tracker, Advokc promotes active citizen participation across Nigeria, because we believe that democracy without active citizenry leads to civil oligarchy. Currently operating in 15 states, we’ve tracked over 300 promises from the Presidency, House of Representatives, and State Governors.

                                        Our platform empowers citizens, advocacy groups, and policymakers with real-time data, user feedback, and transparent reporting to hold leaders accountable. Promise Tracker bridges the gap between citizens and their leaders, encouraging informed decisions and fostering a culture of accountability. Whether tracking presidential, legislative, or state promises, our work culminates in advocating for a transparent and trustworthy political landscape.
                                </p>
                            </div>
                             <div className='we-text-pic'>
                                <div className='text-pic-dis first-h'></div>
                                <div className='text-pic-dis second-h'></div>
                                <div className='text-pic-dis third-h'></div>
                            </div>
                        </div> 
                    </div>


                    <div className='people-con'>
                        <div className='team-con'>
                            <div className='team-con-inner'>
                                <div className='tc1'>
                                    <p id='til'>Team <span className='mem'>Members</span></p>
                                    <p id='dest'>Meet The Faces Behind The Scene</p>
                                </div>
                                <div className='tc2'>
                                    <PeopleCard pic={abiola} name={'Abiola Durodola'} title={"Executive Director"} link={'https://www.linkedin.com/in/abiola-durodola-21baa7b9/'}/>
                                    <PeopleCard pic={habib} name={"Habib Sheidu"} title={"Operations/Project Director"} link={"https://www.linkedin.com/in/habib-sheidu-215b06180/"}/>
                                    <PeopleCard pic={onye} name={"Onyinye Edyson"} title={"Project Manager"} link={"https://www.linkedin.com/in/onyinyeedyson/"}/>
                                    <PeopleCard pic={dare} name={"Dare Olatunde"} title={"Monitoring and Evaluation Manager"} link={"https://www.linkedin.com/in/dareolatunde/"}/>
                                </div>

                            </div>   
                        </div>
                        {/* <div className='team-con'>
                            <div className='team-con-inner'>
                                <div className='tc1'>
                                    <p id='til'>Staff <span className='mem'>Consultants</span></p>
                                    <p id='dest'>Meet The Faces Behind The Scene</p>
                                </div>
                                <div className='tc2'>
                                    <PeopleCard/>
                                    <PeopleCard/>
                                    <PeopleCard/>
                                    <PeopleCard/>
                                </div>

                            </div>

                            
                        </div> */}
                    </div>
                  
            </div>
            <VideoCon isFunc={openModal}/>
            
        </div>
     );
}
 
export default AboutUs;