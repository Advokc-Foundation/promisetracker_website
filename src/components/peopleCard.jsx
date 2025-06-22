import './peopleCard.css'

const PeopleCard = ({pic,name,title,link}) => {
    return (  
        <div className='pe-con'>
            <div className='inner-pe'>
                <div className='pe-pic' style={{backgroundImage:`url(${pic})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
                <div className='pe-details'>
                    <p id='p11'>{name}</p>
                    <p id='p22'>{title}</p>
                </div>
                <div className='pe-linke'>
                     <a href={link} target='_blank' rel='noopener noreferrer'>
                       <div className='pe-cir'>
                        
                        </div>
                     </a>
                    
                </div>
            </div>
        

        </div>
    );
}
 
export default PeopleCard;