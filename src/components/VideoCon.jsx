import './VideoCon.css'

const VideoCon = ({isFunc}) => {
    return ( 

                <div className='vid-con'>
                    <div className='inner-vid2'>
                        <div className='video-player-outer'>
                            <div className='video-player-inner'>
                                 <div className='vid-title'><p>Become a Member of Our Cohort</p></div>
                                <div className='vid-words'><p> Join our community of changemakers and gain access to exclusive resources, training, and opportunities to make a tangible impact on democracy and civic engagement.</p></div>
                                <div className='vid-player'>
                                    <div id='layer1'>
                                        <div className='main-vid-player'>
                                            <a href=" https://youtu.be/NK7NJen93_Q?si=lJtKyvOl9C2sBgwj" target='_blank' rel='noopener noreferrer'>
                                                <div className='player-icon'>

                                                </div>
                                            </a>
                                            
                                        </div>

                                    </div>
                                </div>
                                <div className='vid-btn'>
                                    <button onClick={isFunc}>Join Cohort</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
     );
}
 
export default VideoCon;