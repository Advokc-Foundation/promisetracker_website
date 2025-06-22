import '../components/EmailList.css'

const EmailList = () => {
    return ( 

        <>
        <div className="email-container" >
            <div className="centered-email">
                <div className='first-divv'>
                    <p className='join-text'>Join our EmailList</p>
                    <p className='text2'>Join our email list and daily update promise</p>
                    <div className='people-div'></div>
                </div>
                <div className='second-divv'>
                    <div className='field-div'>
                        <p className='headings-1'>Full Name</p>
                        <input type="text"  className='text-area' placeholder='Enter Name'/>
                    </div>
                    <div className='field-div'>
                        <p className='headings-1'>Email Address</p>
                        <input type="email"  className='text-area' placeholder='Enter Email'/>
                    </div>
                    <button className='sub-btn'>Submit</button>
                </div>
            </div>
        </div>

        </>
     );
}
 
export default EmailList;