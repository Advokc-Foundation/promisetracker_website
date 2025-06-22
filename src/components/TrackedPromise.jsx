import './TrackedPromise.css'
import { useEffect,useState } from 'react';
import { processString } from '../utils/stringOperations';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import defaultimage from '../assets/defaultimage.png';
const TrackedPromise = () => {


    const [promiseData,setPromiseData] = useState([]);

    useEffect(()=>{
        const fetchLatest = async ()=>{
            try{
                const result = await fetch('https://admin.promisetracker.ng/api/v1/promise-tracker/latest/promises/fetch');
                const response = await result.json();
                const data = response.data;
               if (data && Array.isArray(data) && data.length > 0) {
                        setPromiseData(data);
                } else {
                    setPromiseData([]);
                }
                
             
            }catch(error){
                console.log("Cannot fetched Latest Fetched Tracked Promise", error);
            }
        }

        fetchLatest();
    },[])




    return ( 
        <>
        <div className='tracker-con'>
            <div className='tracked-promise-title'>
                <div><p>Latest Tracked <span>Promise</span></p></div>
            </div>
            <div className='tracked-promise-words'>
                <p>AdvoKC tracks campaign promises in order to inform readers <br /><span>how well elected officials carry out their agenda.</span></p>
            </div>
            <div className='tracked-promise-display'>
                <div className='pro-blog-con'>
                    {promiseData.map((data,index)=>  
                        <div className='pro-blog' key={index}>
                        <div id='inner-pro'>
                            <div className='pro-b-image' style={{
                                backgroundSize:'cover',
                                backgroundPosition:'center',
                                backgroundRepeat:'no-repeat',
                                backgroundImage:`url(${data.meter.meter_img || defaultimage})`
                            }}></div>
                            <div  className='pro-b-title-words'>
                                <div className='pro-title'>
                                    <p>{processString(data.meter.meter_name)}</p>
                                </div>
                                <div className='pro-words'>
                                <p>{data.title}</p>
                                </div>
                            </div>
                            <div className='pro-b-btn'>
                                <div id='b-btn-div'></div>
                                <Link id='linktoBlog'to={`/blog/${data.id}`} ><div><p>Read More</p></div></Link>
                                
                            </div>
                        </div>
                    
                    </div>
                        
                    )
                    
                    }
                  
                </div>
                
            </div>
               <div className='more-state1'>
                            <div >
                                 <Link className="to-state1" to='/promiseRing'>Browse More Tracked Promises</Link> 
                            </div>
                            <div className='more-state-arrow1'></div>
                </div>
        </div>
        </>
     );
}
 
export default TrackedPromise;