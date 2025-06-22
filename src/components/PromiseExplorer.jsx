import { useState,useEffect } from 'react';
import './PromiseExplorer.css';
import StatusIcon from './statusIcon';
import { Link } from 'react-router-dom/cjs/react-router-dom';



const PromiseExplorer = ({pr,exStat,iden,func}) => {
    const [activeStatus, setActiveStatus]= useState(0);
    const[activeSubject, setActiveSubject] = useState(null);
    const[activeStatFilter, setActiveStatFilter] = useState(null)
    const subjectArea = ['economy & jobs', 'healthcare', 'education', 'infrastructure','environment', 'justice & security','governance & political reform'];
    const [dataPromises, setDataPromises] = useState([]);
    const [query, setQuery] = useState('');
    const [filterPromises, setFilterPromises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [email,setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    

    const totalPages = Math.ceil(pr.length / itemsPerPage);
    // console.log(pr);

    //   useCustomEffect(pr);

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
    

    const handleStatusClick=(id)=>{
        setActiveStatus(id)
    }
    const handleStatClick = (id)=>{
        setActiveStatFilter(id);
        const fillPromise = pr.filter(promise=> formatStatus(promise.status) === id);
        setFilterPromises(fillPromise);
        setCurrentPage(1);
    }

    const handleSubject = (id)=>{
        setActiveSubject(id);
        const subPromise = pr.filter(promise=> promise.subject_area === id);
        setFilterPromises(subPromise);
        setCurrentPage(1);
    }


    // Remove underscores and convert the string to uppercase
    const formatStatus = (status) =>{
        const noUnderscore = status.replace(/_/g, '');
        const uppercased = noUnderscore.toUpperCase();
        return uppercased;
    }

    //Replacing underscores with space and first letter to uppercase
    const capitalize = (string)=>{
        const noUnderscore = string.replace(/_/g, ' ');
        const name = noUnderscore.charAt(0).toUpperCase() + noUnderscore.slice(1);
        return name;
    }
    // Convert the promise title to uppercase
    const queryFormatStatus = (status) =>{

        const upper = status.toUpperCase();

    return upper;
}
    // default for accepting promise data from parent
    
    useEffect(() => {
        // setDataPromises(pr); 
        setFilterPromises(pr || []); 
         setIsLoading(false);
         func(false)


    }, [pr]);

//     useEffect(() => {
//     if (pr && pr.length > 0) {
//         setDataPromises(pr);
//         setFilterPromises(pr); 
//     } else {
//         setDataPromises([]); 
//         setFilterPromises([]);
//     }
//     setIsLoading(false); 
//     func(false); 
// }, [pr]);

//     useEffect(() => {
//     if (pr && pr.length > 0) {
//         setDataPromises(pr); 
//         setFilterPromises(pr); 
//         setIsLoading(false);
//     } else if (pr && pr.length === 0) {
//         setIsLoading(false); // No promises, but no longer loading
//     }
// }, [pr]);

    

    // effect for the searching functionality
    useEffect(()=>{
        const filteredPromises = handleQuery(query, pr); 
        setFilterPromises(filteredPromises);
         setCurrentPage(1);
         setActiveStatFilter(null);
         setActiveSubject(null);
         

    },[query])

    // converting query to match input searches
    const handleQuery = (query,pr)=>{
            if(!query){
                return pr;
            }else{
                const queryUpperCase = query.toUpperCase();
                 return pr.filter(promise=>queryFormatStatus(promise.title).includes(queryUpperCase));
            }
           
    }
//     const handleQuery = (query) => {
//     const queryUpperCase = query.toUpperCase();
//     if (query) {
//         const filteredPromises = pr.filter(promise =>
//             queryFormatStatus(promise.title).includes(queryUpperCase)
//         );
//         setFilterPromises(filteredPromises);
//     } else {
//         setFilterPromises(pr); // No query, reset to the original data
//     }
//     setCurrentPage(1); // Reset pagination to page 1
// };

    //handling page change
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

   {/*
        useEffect(
        ()=>{
            console.log(email);
            console.log(iden)
        }
    )

*/} 
 
    const getFillerBackgroundStyle = (status)=>{
        const statusBackgrounds = {
        "compromised": "linear-gradient(90deg, #9B9999 0%, #9B9999 16.73%, #9B9999 16.74%, #FFA500 53.97%)",
        "stalled": " linear-gradient(90deg, #9B9999 0%, #9B9999 16.73%, #9B9999 16.74%, #FAE916 61.51%)",
        "kept": "linear-gradient(90deg, #9B9999 0%, #9B9999 16.73%, #9B9999 16.74%, #00BB03 52.7%, #00BB03 100%)",
        "broken": " linear-gradient(90deg, #9B9999 0%, #9B9999 16.73%, #9B9999 16.74%, #E20102 52.7%, #E20102 100%)",
        "intheworks": "linear-gradient(90deg, #9B9999 0%, #9B9999 16.73%, #9B9999 16.74%, #0073E6 52.7%, #0073E6 100%)",
        "notyetrated": "linear-gradient(90deg, #9B9999 0%, #9B9999 16.73%, #9B9999 16.74%, #D9D9D9 52.7%, #D9D9D9 100%)"
    };


    if (!status) return statusBackgrounds["notyetrated"];
    const normalizedStatus = status.replace(/_/g, '').toLowerCase();
    const backgroundStyle = statusBackgrounds[normalizedStatus] || statusBackgrounds["notyetrated"];
    return backgroundStyle;   
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






    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPromises = filterPromises.slice(indexOfFirstItem, indexOfLastItem);

    return ( 
        <>
        <div className="explorer-con">
            <div className='title-div-ex'>
                <div className='explore-title-con'>
                    <div id='first-div'><p>Explore <span>promises</span></p></div>
                    <div id='second-div'><p>Sort promises by status, or subject areas, and then <span className='mob-span'> select a promise to read further.</span></p></div>
                </div>
            </div>
            <div className='pr-view-con'>
                <div className='pr-view-inner'>
                    <div className='pr-toggle-con'>
                        <div className='pr-toggle'>
                            <div id='pr-1'>
                                 <div className={`by-status ${activeStatus === 0 ? 'active' : ''}`} onClick={()=>handleStatusClick(0)}>
                                    <p>BY STATUS</p>
                                 </div>
                                 <div className={`by-subject ${activeStatus === 1 ? 'active' : ''}`} onClick={()=>handleStatusClick(1)}>
                                    <p>BY SUBJECT AREAS</p>
                                 </div>
                            </div>
                            <div id='pr-2'>
                                <div className='pr-search'>
                                    <div id='img-pr'></div>
                                </div>
                                <input type="text" placeholder='Search' className='input-sr' onChange={(e)=> setQuery(e.target.value)}/> 

                            </div>   
                        </div>
                        <div className='pr-stat-display'>
                            {activeStatus === 1 &&
                                    subjectArea.map((subject)=>(
                                            <div className={`sbj-area ${activeSubject === subject ? 'sbj-active':''}`} onClick={()=>handleSubject(subject)} key={subject}> 
                                                <p>{capitalize(subject)}</p>
                                            </div>
                                    ))
                                

                            }
                            { activeStatus=== 0 && 
                            <>
                                <div className={`stat-con ${activeStatFilter === 'NOTYETRATED' ? "clicked":""}`}  onClick={()=>handleStatClick('NOTYETRATED')}>
        
                                    <div className='stat-icon nyr-bg'></div>
                                    <div className='stat-text'>
                                        <p>NOT YET RATED</p>
                                    </div>
                                    <div className='stat-count'><p>{exStat.notRated}</p></div>
                                </div>
                                <div className={`stat-con ${activeStatFilter === "INTHEWORKS" ? "clicked":""}`}  onClick={()=>handleStatClick('INTHEWORKS')}>
                                    <div className='stat-icon inw-bg'></div>
                                    <div className='stat-text'>
                                        <p>IN THE WORKS</p>
                                    </div>
                                    <div className='stat-count'><p>{exStat.inWorks}</p></div>
                                </div>
                                <div className={`stat-con ${activeStatFilter === "STALLED" ? "clicked":""}`}  onClick={()=>handleStatClick("STALLED")}>
                                       <div className='stat-icon stalled-bg'></div>
                                       <div className='stat-text'>
                                        <p>STALLED</p>
                                       </div>
                                    <div className='stat-count'><p>{exStat.stalled}</p></div>
                                </div>
                                <div className={`stat-con ${activeStatFilter === "COMPROMISED" ? "clicked":""}`}  onClick={()=>handleStatClick('COMPROMISED')}>
                                        <div className='stat-icon compro-bg'></div>
                                       <div className='stat-text'>
                                        <p>COMPROMISED</p>
                                       </div>
                                     <div className='stat-count'><p>{exStat.compromised}</p></div>
                                </div>
                                <div className={`stat-con ${activeStatFilter === 'BROKEN' ? "clicked":""}`}  onClick={()=>handleStatClick('BROKEN')}>
                                      <div className='stat-icon broken-bg'></div>
                                       <div className='stat-text'>
                                        <p>BROKEN</p>
                                       </div>
                                       <div className='stat-count'><p>{exStat.broken}</p></div>
                                </div>
                                <div className={`stat-con ${activeStatFilter === 'KEPT' ? "clicked":""}`}  onClick={()=>handleStatClick('KEPT')}>
                                       <div className='stat-icon kept-bg'></div>
                                       <div className='stat-text'>
                                        <p>KEPT</p>
                                       </div>
                                       <div className='stat-count'><p>{exStat.kept}</p></div>
                                </div>
                            
                            </>
                            
                            }
                                
                        </div>
                   
                    </div>
                    <div className='pr-display'>

                        {isLoading ? (
                                    <p>Loading promises...</p>
                                ) : currentPromises.length > 0 ? (
                                    currentPromises.map(promise => (
                                        <Link className="ex-link" to={`/blog/${promise.id}`} key={promise.id}> 
                                            <div className='pr-pot'>
                                                    <div className='pot-inner'>
                                                        <div className='pr-pot-inner1'>
                                                            <div className='pot-icon-con'>
                                                
                                                                <StatusIcon status={promise.status}/>
                                                                <div className='pot-status'><p>{capitalize(promise.status)}</p></div>
                                                            </div>
                                                            <div className='pot-text-con'>
                                                            <p>
                                                            {capitalize(promise.title)}
                                                            </p>  

                                                            </div>
                                                        </div>
                                                        <div className='pr-pot-inner2'>
                                                            <div className='update-con'>
                                                                <div id='arrow'></div>
                                                                <div id='update-count'> <p>{`${promise.update_count} Updates`}</p></div>
                                                            </div>
                                                            <div className='filler-con'>
                                                                    <div id='filler-inner' style={{ background: getFillerBackgroundStyle(promise.status) }}>
                                                                    </div>
                                                                    <div className='first-circle'></div>
                                                                    <div className='second-circle' style={{background:getSecondBackgroundStyle(promise.status)}}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className='no-promise'>
                                        <p>No promises found for this meter.</p>
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

                    <div className='follow-meter'>
                        <div className='follow-inner'>
                            <div className='follow-word'><p><span className='follow-span'>Follow this meter</span> <br /> Get email update anytime we update the meter</p>
                            </div>
                            <div className='follow-meter-btn'>
                                <input type="text" placeholder='Add email here' className='follow-input' onChange={(e)=>{setEmail(e.target.value)}} />
                                <div className='follow-btn' onClick={handleDetailsSend}><p>Follow Meter</p></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 



export default PromiseExplorer;




 