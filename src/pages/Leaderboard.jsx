import "./Leaderboard.css"
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp,faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "../utils/stringOperations";
import defaultimage from '../assets/defaultimage.png';

const Leaderboard = () => {

     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [activeTg , setActiveTg] = useState('All');
    const itemsPerPage = 20;
    const [leadData, setLeadData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [param, setParam] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages,setTotalPages] = useState(null);


    useEffect(()=>{
        const fetchBoard = async ()=>{
            try{
                const response = await fetch(`${API_BASE_URL}/all/leaderboards/scores?type=${param}`);
                const result = await response.json();
                const data = result.data;
                const board = data.leaderboards;
                setLeadData(board);
                setIsLoading(false);
                setTotalPages( Math.ceil(board.length / itemsPerPage));
            }catch(error){
                console.log(error);
            }
        }

        fetchBoard();

        

    },[param]);

    // const totalPages = Math.ceil(leadData.length / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3);
                if (totalPages > 3) pageNumbers.push('...', totalPages);
            } else if (currentPage > 3 && currentPage < totalPages - 2) {
                pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            } else {
                pageNumbers.push('...', totalPages - 2, totalPages - 1, totalPages);
            }
        }

        return pageNumbers.map((number, index) => (
            <button
                key={index}
                onClick={() => number !== '...' && handlePageChange(number)}
                className={currentPage === number ? 'active' : ''}
                disabled={number === '...'}
            >
                {number}
            </button>
        ));
    };

    const handleClick = (data)=>{
        setActiveTg(data);
        setParam(data);
    }

    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

    const getColorBackground = (index) =>{
            if(index === 0){
                return "linear-gradient(90deg, #ffbb12 0%, #99700b 100%)"
            }else if(index === 1){
                return "linear-gradient(90deg, #C4C4C4 0%, #898989 100%)"
            }else if(index === 2){
                return 'linear-gradient(90deg, #FFA14B 0%, #B67800 100%)'
            }else{
                return "#ffffff"
            }
    }

    const getTextColour = (index)=>{
        if(index <= 2){
            return "white"
        }else{
            return "#390005"
        }
    }

    const getNumberColour = (index)=>{
        if(index <= 2){
            return "#390005"
        }else{
            return "#B3B3B3"
        }
    }


    useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);


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
        <div className="lead-con11">
            <div className="lead-inner">
                <div className="tg-con">
                    <div className="tg-inner">
                        <div className={`tg ${activeTg === "All" ? "active3": ""}`} onClick={()=>handleClick("All")}>All</div>
                        <div className={`tg ${activeTg === "Week" ? "active3": ""}`} onClick={()=>handleClick('Week')}>This Week</div>
                    </div>
                </div>
                <div className="pos-con">
                    <div className="pos-header">
                        <p className="name-tag">Name</p>
                        <p className="point-tag">Points Acquired</p>
                    </div>
                {leadData.length > 0 ?(leadData.map((lead,index) =>(
                    <div className="pos-display-con" key={index}> 
                        <div className="pos-display">
                                <div className="user-details">
                                    <div className="testno lefti">
                                            <p className="ite" style={{colour:getNumberColour(index)}}>{index+1}</p>
                                            <div className="increase1">
                                                <FontAwesomeIcon icon={faAngleUp} size="sm" color="#24B200"/>
                                                <div className="incre-count">1</div>
                                            </div>
                                    </div>
                                    <div className="test">
                                        <div className="hexagon" style={{
                                                backgroundSize:'cover',
                                                backgroundPosition:'center',
                                                backgroundRepeat:'no-repeat',
                                                backgroundImage:`url(${lead.meter_img || defaultimage})`
                                            }}></div>
                                        <div className="leadname">
                                            <p>{capitalize(lead.name)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="points-con">
                                    <div>
                                        <p className="unl">{lead.completed_courses}</p>
                                    </div>
                                    <div>
                                        <p className="points-cl">{lead.total_score}<span className="cl-span">pts</span></p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    ))):(
                        <div className="empty-lead">
                            <p>No leaderboard found. Please check back later.</p>
                        </div>
                    )}
                    
                </div>
               
               <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}>
                            Prev
                        </button>

                        {renderPageNumbers()}

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
 
export default Leaderboard;