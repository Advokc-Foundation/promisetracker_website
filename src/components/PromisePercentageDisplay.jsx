import './PromisePercentage.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import defaultimage from '../assets/defaultimage.png';



const PromisePercentage = ({ pr, con = null, meterData = [], grabMeterId = () => {}, iden}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const totalCount = pr.totalCount || 1;
    const notRated = Math.round((pr.notRated / totalCount) * 100 )|| 0;
    const itw = Math.round((pr.inWorks / totalCount) * 100) || 0;
    const stall = Math.round((pr.stalled / totalCount) * 100 ) || 0;
    const compromised = Math.round((pr.compromised / totalCount) * 100) || 0;
    const kept = Math.round((pr.kept / totalCount) * 100) || 0;
    const broken = Math.round((pr.broken / totalCount) * 100 ) || 0;
   
    const firstConPerHeight = con ? '290px' : '370px';
    const [email,setEmail]  = useState('');

    const [upperChamberMeters,lowerChamberMeters,chamber,defaultChamber]= meterData;

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        grabMeterId(e.target.value);
    };


        //handle sending details to back
    const handleDetailsSend = async ()=>{
        if (email.trim() === '') {
            alert('Please enter a valid email address.');
            return;
        }
        if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
        }
        const data = {
            email: email,
            meter_id: iden,
        };
        try{
            const response = await fetch('https://admin.promisetracker.ng/api/v1/promise-tracker/subscribe/to/meter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('You have successfully subscribed to the meter updates.');
            } else {
                alert('Failed to subscribe. Please try again later.');
            }

        }catch(error){
            console.log('Error occured.')
        }


    }



    return (  
        <>
        <div className='first-con-per' style={{ height: firstConPerHeight }}>
            <div className='percentage-promise-con'>
                <div className='percentage-view'>
                    <div className='per-pic-con'>
                        <div className='inner-per'>
                            <div id='picture' style={{backgroundImage:`url(${pr.meterImage || defaultimage})`}} ></div>

                            <div id='count-track'>
                                <div className='count-title'>
                                    <div id='logoc'></div>
                                    <div id='title-text'>
                                        <p>TOTAL PROMISE TRACKED</p>
                                    </div>
                                </div>
                                <div className='count-track-number'><p>{pr.totalCount}</p></div>
                            </div> 
                        </div>
                       
                    </div>
                    <div className='per-con'>
                        <div className='first-per-con'>
                            <div className='first-per-inner'>
                                <div className='percentage-bar'>
                                    <div className='percentage-bar-inner'>
                                        <div className='varybox' style={{ width: `${notRated}%` }}>
                                            <p>{`${notRated}%`}</p>
                                            <div className='nyt-div'></div>
                                        </div>
                                        <div className='varybox' style={{ width: `${itw}%` }}>
                                             <p>{`${itw}%`}</p>
                                            <div className='itw-div'></div>
                                        </div>
                                        <div className='varybox' style={{ width: `${stall}%` }} >
                                             <p>{`${stall}%`}</p>
                                            <div className='stall-div'></div>
                                        </div>
                                        <div className='varybox' style={{ width: `${compromised}%` }}>
                                             <p>{`${compromised}%`}</p>
                                            <div className='compromised-div'></div>
                                        </div>
                                        <div className='varybox' style={{ width: `${kept}%` }}>
                                             <p>{`${kept}%`}</p>
                                            <div className='kept-div'></div>
                                        </div>
                                        <div className='varybox' style={{ width: `${broken}%` }}>
                                             <p>{`${broken}%`}</p>
                                            <div className='broken-div'></div>
                                        </div>
                                    </div>
                  
                                </div>
                                <div className='full-count'>
                                    <p>100%</p>
                                </div>

                            </div>
                        </div>
                        <div className='second-per-con'>
                            <div className='second-per-inner'>
                                <div className='res-con'>
                                    <div className='color-res point1'></div>
                                    <div className='res-title'><p>Not Yet Rated</p>
                                    </div>
                                    <div className='res-counter'>{pr.notRated}</div>
                                </div>
                                <div className='res-con'>
                                     <div className='color-res point2'></div>
                                     <div className='res-title'><p>In The Works</p>
                                     </div>
                                     <div className='res-counter'>{pr.inWorks}</div>
                                </div>
                                <div className='res-con'>
                                     <div className='color-res point3'></div>
                                     <div className='res-title'><p>Stalled</p>
                                     </div>
                                     <div className='res-counter'>{pr.stalled}</div>
                                </div>
                                <div className='res-con'>
                                     <div className='color-res point4'></div>
                                     <div className='res-title'><p>Compromised</p>
                                     </div>
                                     <div className='res-counter'>{pr.compromised}</div>
                                </div>
                                <div className='res-con'>
                                     <div className='color-res point5'></div>
                                     <div className='res-title'><p>Kept</p>
                                     </div>
                                     <div className='res-counter'>{pr.kept}</div>
                                </div>
                                <div className='res-con'>
                                     <div className='color-res point6'></div>
                                     <div className='res-title'><p>Broken</p>
                                     </div>
                                     <div className='res-counter'>{pr.broken}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {con ? (
                    <div className='drop-down-con'>
                    <div>
                            <select className='drop-down' value={selectedOption || ''} onChange={handleChange}>
                                <option value="" disabled>{defaultChamber}</option>     
                                    {(chamber ? upperChamberMeters : lowerChamberMeters).map((item) => (
                                 <option key={item.id} value={item.id}>
                                     {item.name}
                                 </option>
    ))}
</select>
                    </div>
                </div>):(
                    <div className='follow-con'>
                    <div className='follow-meter-dp'>
                        <div className='follow-inner-dp'>
                            <div className='follow-word-dp'><p><span className='follow-span-dp'>Follow this meter</span> <br /></p>
                                <p className='center-p'>Get email update anytime we update the meter</p>
                            </div>
                            <div className='follow-meter-btn-dp'>
                                <input type="text" placeholder='Add email here' className='follow-input-dp' onChange={(e)=>{setEmail(e.target.value)}}/>
                                <div className='follow-btn-dp' onClick={handleDetailsSend}><p>Follow Meter</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                )
                }
                
             
                
            
                
                {/*
                */}
     
            </div>
        </div>
      
        
        
        </>
    );
}
 
export default PromisePercentage;