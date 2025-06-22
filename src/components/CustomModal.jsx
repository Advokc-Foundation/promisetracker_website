import './CustomModal.css'
import { FacebookShareButton,WhatsappShareButton,LinkedinShareButton,InstapaperShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon, InstapaperIcon, LinkedinIcon } from 'react-share';
import { useEffect, useState } from 'react';



const CustomModal = ({overlayFunc,action,obj}) => {

    const [wordsObj,setWordObj] = useState({});

    useEffect(()=>{
        const fetchWord = async ()=>{
            try{
                const response = await fetch('https://admin.promisetracker.ng/api/v1/promise-tracker/get/cohort/text');
                const wordResult = await response.json();
                setWordObj(wordResult.data);

            }catch(error){
                console.log(error);
            }

        };
        fetchWord();
    },[]);


    return ( 
        <div className='modal-overlay' onClick={overlayFunc}>
            <div className='modalOuter'>
                {action === "joinCo" &&
                        //  <p className='dis-text3'>Thank you for your interest!. Unfortunately, applications for the current cohort are closed. Please check back later or <a className='modal-link' href="https://zfrmz.com/2ZqGdIPf5Z7Ri8DdNnUQ" target="_blank" rel="noopener noreferrer" >
                        // <span>join the waitlist</span></a> to be notified when the next cohort opens.</p>
                        <div className='dis-text3' dangerouslySetInnerHTML={{__html:wordsObj.text}}/>
                }

                {
                    action === "share" &&
                    <div style={{display:"flex", flexDirection:"column", gap:'10px', alignItems:"center", width:"100%"}}>
                        <p className='dis-text3'> Share this article on your favorite platforms</p>
                        <div style={{display:'flex', gap:"10px"}}>
                             <FacebookShareButton url={"www.promisetracker.ng"}>
                                <FacebookIcon size={30} round={true}/>
                            </FacebookShareButton>

                            <WhatsappShareButton url={"www.promisetracker.ng"}>
                                <WhatsappIcon size={30} round={true}/>
                            </WhatsappShareButton>

                            <LinkedinShareButton url={"www.promisetracker.ng"}>
                                <LinkedinIcon size={30} round={true}/>
                            </LinkedinShareButton>
                        </div>
                       
                    </div>
                }
               

            </div>
        </div>
       

     );
}
 
export default CustomModal;