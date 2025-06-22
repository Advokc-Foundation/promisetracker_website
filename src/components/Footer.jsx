import './Footer.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
    return ( 
        <>
        <div className='footer-con'>
            <div className='first-div'>
                <div className='first-wrap'>
                    <div className='series'>
                        <div id='div1'>
                            <div className='foot-logo'>
                                <div id='logo'>

                                </div>
                                <div id='logo2'>

                                </div>
                            </div>
                            <div className='words-div'>
                                <p>The Promise tracker is dedicated to providing real-time updates, tracking progress, holding leaders accountable, ensuring transparency and fostering trust in governance. Stay informed on our latest updates.</p>
                            </div>
                            <div className='menu-logo'>
                                
                                <a href="https://www.linkedin.com/company/oxie-media/mycompany/" target='_blank' rel='noopener noreferrer'>
                                     <div id='link'></div>
                                </a>
                               
                               
                                   
                                <a href='https://x.com/promisetrackers?t=w8CApu2EuLYA-IaFAY1dkg&s=09' target='_blank' rel='noopener noreferrer'>
                                    <div id='twitter'></div>
                                </a>
                                
                                <a href='https://www.facebook.com/share/S2qsFuAWqAoLTyZZ/?mibextid=qi2Omg' target='_blank' rel='noopener noreferrer'>
                                      <div id='facebook'></div>
                                </a>
                                <a href=' https://www.instagram.com/promisetrackers?igsh=cGVsM2pmZ2JxeGlq' target='_blank' rel='noopener noreferrer'>
                                     <div id='insta'></div>
                                </a>
                                   
                               
                               
                                
                                
                            </div>
                        </div>
                        <div id='div2'>
                            <div className='contact-div'>
                                <div className='tiles-title'><p>Contact</p></div>
                                <div className='con-contact'>
                                    <div className='tiles-word'><p>21 Akinsanya St, Ikeja, Ojodu, Lagos, Nigeria</p></div>
                                    <div className='tiles-word'><p>Email: admin@advokc.ng <br />Phone number: 08137056530</p></div>
                                </div>
                                
                            </div>
                            <div className='about-div'>
                                <div className='tiles-title mar-one'><p>About</p></div>
                                <div className='tiles-link'>
                                            <Link className="aboutLink" to={'/aboutUs'}><p>About Us</p></Link>
                                            <a href="https://www.advokc.ng/about-us--new"><p>Our Story</p></a>
                                            <a href=" https://www.advokc.ng/careers--new"><p>Careers</p></a> 
                                            <a href=""></a><p>Media Kit</p></div>
                            </div>
                            <div className='links-div'>
                                     <div className='tiles-title'><p>Useful Link</p></div>
                                     <div className='tiles-link2'>
                                        
                                                <a href="https://zfrmz.com/Wu28tmb13ZQcYNV5f9mq" target='_blank' rel='noopener noreferrer'><p>Submit a Promise</p></a>
                                                <a href="https://www.advokc.ng/climate-advokc"><p>Climate Advokc</p></a>
                                                <a href="https://www.advokc.ng/"><p>AdvoKC Foundation</p></a>
                                                <a href=""><p>Terms of Service</p></a>
                                            </div>
                            </div>
                        </div>
                        <div id='div3'>
                            <div className='news-title'>
                                <div className='tiles-title'><p>Newsletter</p></div>
                                <div className='tiles-writing'><p>Subscribe to our newsletter and be the first to receive updates on the promises we’re tracking and their progress.</p></div>
                            </div>
                            <div className='sub-wrap'>
                               <input type="text" placeholder='Enter your email' />
                                <button>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className='design'></div>

                </div>
            </div>
            <div className='second-div'>
                <div className='second-wrap'>
                    <div className='copyright'>
                        <div><p>Copyright</p></div>
                        <div><p>Promise Tracker All Right Reserved 2024</p></div>
                    </div>
                    <div className='class-menu'>
                        <div>
                            <HashLink smooth to="/#faq-section" className='hash'>
                                <p>FAQ</p>
                            </HashLink>
                            
                        </div>
                        <div><p>Help Desk</p></div>
                    </div>
                </div>
               
            </div>
          

        </div>

        </>
     );
}
 
export default Footer;