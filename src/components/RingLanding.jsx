import "./RingLanding.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect} from "react";
import EachStateSvg from "./EachStateSvg";
import RingFeeder from "./ringFeeder";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { Link } from "react-router-dom";
import defaultimage from '../assets/defaultimage.png';

const RingLanding = () => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [ringStats,setRingStats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clickedRing, setClickedRing] = useState('');
    const [svgCl,setSvgCl] = useState("");
    const [loading,setLoading] = useState(false);
    const itemsPerPage = 9;



     //const totalPages = Math.ceil(dataPromises.length / itemsPerPage);
    const totalPages = 5;
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPromises = ringStats.slice(indexOfFirstItem, indexOfLastItem);


   useEffect(()=>{
        const fetchPromises = async ()=>{
            setLoading(true);
                try{
                    const response = await fetch(`${API_BASE_URL}/all/promise-ring/states`);
                    const result = await response.json();
                    setRingStats(result.data);

                }catch(error){
                    console.log(error); 
                }finally{
                    setLoading(false);
                }
        }

        fetchPromises();
   },[]);

   const handleClickRing =(data)=>{
        setClickedRing(data);
        setSvgCl(data);
   }


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
        <div className="landing-con">
            <div className="inner-landing">
                <div className="card-r-con">
                    {currentPromises.map((current,index)=>{ 
                        const isActive = svgCl === current.name;
                    return (
                    <div className="ring-card" key={index} onClick={()=>handleClickRing(current.name)} style={{backgroundColor:`${isActive?"#5F1016":"white"}`}}>
                        <div className="ring-tl">
                            <p className="w-fo" style={{color:`${isActive?"white":"black"}`}}>{current.name}</p>
                            {current.meter && current.meter.length > 0 ? (
                                        <p className="x-fo">{current.meter[0]?.promises_count} promises</p>
                                    ) : (
                                        <p className="x-fo">0 promises</p>
                                    )}
                        </div>
                        <div className="rng-dis">
                            <RingFeeder data={current.name} isSelected={isActive} />
                            <FontAwesomeIcon icon={faArrowTurnUp} color="#5F1016" transform={{ rotate: 90 }} size="lg"/>   
                        </div>
                        {clickedRing === current.name &&  <div className="card-details">
                           
                            {current.meter && current.meter.length > 0 ?(
                                <div className="govv-pic"  style={{backgroundImage:`url(${current.meter[0]?.meter_img})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
                            ):(
                                <div className="govv-pic"  style={{backgroundImage:`url(${defaultimage})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
                            )}

                            {current.meter && current.meter.length > 0 ?(
                                <h3 className="govvv-text"><span className="bl-span">{current.meter[0]?.name}</span> Governor of {current.name} has {current.meter[0]?.promises_count} promises in the promise ring</h3>
                            ):(
                                <h3 className="govvv-text">No promises in the promise ring</h3>
                            )}
                            
                            <Link className="lnk" to={`/promiseRing/${current.name}`}>
                                <div className="govv-main">
                                    <h1 className="gov-rin-text">View promise ring</h1>
                                    <FontAwesomeIcon icon={faArrowUp} transform={{ rotate: 45 }} size="xs"/>
                                </div>
                            </Link>
                            
                        </div>}
                       

                    </div>
                    )
                }
                    )}

                </div>
                

                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}>
                            Prev
                        </button>

                        {}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>


            </div>

        </div>
     );
}
 
export default RingLanding;