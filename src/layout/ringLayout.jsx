import "./ringLayout.css"
import TrackedPromise from "../components/TrackedPromise";
import RingShared from "../components/ringShared";
import RingLanding from "../components/RingLanding";
import { useEffect } from "react";

const RingLayout = ({children}) => {

       useEffect(() => {
       
            window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return ( 
        <div className="state-con">
             <div className='state-title'>
                   <div className='title-st-con'>
                        <div className='st-title-inner'>
                            <p><span>Promise</span>Ring</p>
                        </div>
                        <div className='st-explain'>
                            <p><span>The State Tracker monitors the most important  promises of State Governors in Nigeria.For each</span> promise, our reporters research the issue and then rate it based on whether the promise was achieved.</p>
                        </div>
                    
                   </div> 
                </div>

            {/* <RingLanding/> */}
                {children}
            {/* <RingShared/> */}
            <TrackedPromise/>
        </div>

     );
}
 
export default RingLayout;