import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/homepage'
import EmailList from './components/EmailList'
import PromiseReminder from './pages/PromiseReminder'
import TrackedPromise from './components/TrackedPromise'
import PromiseExplorer from './components/PromiseExplorer'
import PromisePercentage from './components/PromisePercentageDisplay'
import PresidentialTracker from './pages/PresidentialTracker'
import StateTracker from './pages/StateTracker'
import Blog from './components/Blog'
import AboutUs from './pages/AboutUs'
import PromiseRing from './pages/PromiseRing'
import LegislativeTracker from './pages/LegislativeTracker'
import Leaderboard from './pages/Leaderboard'
import RingLayout from './layout/ringLayout'
import RingLanding from './components/RingLanding'
import RingShared from './components/ringShared'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom/cjs/react-router-dom'

function App() {

  return (
    <>
      <Router>
        <div className='adokv'>
          <Navbar/>
            <Switch>
              <Route exact path='/blog/:id'>
                 <Blog/>
              </Route>
              <Route exact path='/emailList'>
                 <EmailList/>
              </Route>
              <Route exact path='/home'>
                <Homepage/>
              </Route>
               <Route exact path='/'>
                <Homepage/>
              </Route>
              <Route path='/presidentialTracker'>
                <PresidentialTracker/>
              </Route> 
              <Route path='/stateTracker'>
                <StateTracker/>
              </Route> 
              <Route exact path='/promiseRing'>
                <RingLayout>
                  <RingLanding />
                </RingLayout>
              </Route>
              <Route exact path='/promiseRing/:id'>
                <RingLayout>
                  <RingShared/>
                </RingLayout>
              </Route>
              <Route path='/legislativeTracker'>
                <LegislativeTracker/>
              </Route>
              <Route exact path='/promiseReminder'>
                <PromiseReminder/>
              </Route>
              <Route exact path='/aboutUs'>
                <AboutUs/>
              </Route>
               <Route exact path='/leaderboard'>
                <Leaderboard/>
              </Route>
            </Switch>
          <Footer/>

          
        </div>
        
          
      </Router>
     
   
   

    </>
  )
}

export default App
