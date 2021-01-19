import React, {useContext} from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

/* Ionic */
import {
  setupConfig,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';

/* Router */
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch, Link, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import history from './history';

/* UI */
import { homeOutline, searchOutline, listCircleOutline, personOutline} from 'ionicons/icons';

/* SignIn */
import SignIn from './pages/front-pages/SignIn';
import SignUp from './pages/front-pages/SignUp';
import FrontPage from './pages/front-pages/FrontPage';

/* Tabs */
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import MyClubs from './pages/MyClubs';
import ClubProfile from './pages/ClubProfile';
import UserSettings from './pages/UserSettings';

/* Components */
import Club from './components/Club';
import Loader from './components/Loader/loader.js';

/* Club Registration */
import ClubTypes from './pages/club-registration/ClubTypes';
import ClubColleges from './pages/club-registration/ClubColleges';
import ClubSocials from './pages/club-registration/ClubSocials';
import DaysOfWeek from './pages/club-registration/DaysOfWeek';
import ClubRegistration from './pages/club-registration/ClubRegistration';
import AddEvent from './pages/AddEvent';

/* Interest Quiz */
import InterestQuiz from './pages/interest-quiz/InterestQuiz';

/* Global CSS to apply to all components */
import './global_styles.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* User Context */
import {UserContext} from './UserContext';
import {ClubContext} from './ClubContext'
import Student from './components/Student';
import { stringify } from 'query-string';

/* Sample Pics - Remove later */
import john from './images/john.jpg';
import ice from './images/rsz_ice_cream.jpg';
import {DD_fake_clubs, DD_guest_user} from './DummyData'

// put 'md' here for android view, put 'ios' here for ios view
setupConfig({
  mode: 'ios'
});

type AppState = {
  isAuthenticated: boolean;
  hasTakenQuiz: boolean;
  skipQuiz: boolean;
  user: Student | undefined;
  club_data: Map<string,Club> | undefined;
}



export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
      isAuthenticated: false, 
      hasTakenQuiz: false,
      skipQuiz: false,
      user: undefined,
      club_data: undefined
    }

  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState({
      isAuthenticated: false, // Can probably call the browser to find any recent auth rather than default to false
      hasTakenQuiz: false,    // Should actually be set by data received from server
      skipQuiz: false         // Default to false
    });
  }

  // After the component did mount, we set the state
  componentDidMount() {
  }

  fetch_club_data() {

    setTimeout(() => {  this.setState({club_data: DD_fake_clubs}); }, 1500);
  }

  authenticate = (user : any) => {
    if (user)
      this.setUser(user);
    else // Change - remove clubs before release build
      this.setState({user: DD_guest_user});
    
    history.push("/")

    this.setState({isAuthenticated : true});
    this.fetch_club_data();
  }

  setUser = (u : any) => {
    this.setState({user: new Student(
      u.firstName,
      u.lastName,
      u._id,
      u.school,
      u.email,
      ["social", "recreation", "outdoors", "athletic", "games"],
      ["John Club","John Club 2"],
      ["Ice Cream Club"]
    )})
  }

  skipQuiz = () => {
    this.setState({
      skipQuiz: true
    })
  }

  finishQuiz = () => {
    this.setState({
      hasTakenQuiz: true
    })
  }

  // render will know everything!
  render() {
    console.log("rendering " + history.location.pathname)
    
    let isauth = this.state.isAuthenticated;
    let default_route = <Route render={() => <Redirect to="/login" />} exact={true} />

    if (this.state.isAuthenticated) {
      if (this.state.hasTakenQuiz) {
        default_route = <Route render={() => <Redirect to="/feed" />} exact={true} />
      }
      else {
        default_route = <Route render={() => <Redirect to="/interestQuiz" />} exact={true} />
      }
    }
      

    let ProtectedRouteProps = {isAuthenticated: this.state.isAuthenticated, authenticationPath: '/login'}

    return (
      <IonApp>
          <UserContext.Provider value={this.state.user}>
          <ClubContext.Provider value={this.state.club_data}>
            {(isauth && !this.state.club_data) && 
              <Loader></Loader>
            }
            <IonReactRouter history={history}>
              <IonTabs>
                <IonRouterOutlet>
                  <Switch>
                    <Route path="/signin" render={(props) => (isauth) ? <Redirect to={'/'} /> : <SignIn {...props} authenticate={this.authenticate}/>}/>
                    <Route path="/signup" render={(props) => (isauth) ? <Redirect to={'/'} /> : <SignUp {...props} authenticate={this.authenticate} />} />
                    <Route path="/login"  render={(props) => (isauth) ? <Redirect to={'/'} /> : <FrontPage {...props} authenticate={this.authenticate} />} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/feed' component={Feed} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/explore' component={Explore} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/myclubs' component={MyClubs} />
                    <ProtectedRoute {...ProtectedRouteProps} path="/club/:id" component={ClubProfile} /> 
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/clubRegistration' component={ClubRegistration} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/profile' component={UserSettings} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/addEvent' component={AddEvent} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/clubTypes' component={ClubTypes} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/clubColleges' component={ClubColleges} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/clubSocials' component={ClubSocials} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path='/daysOfWeek' component={DaysOfWeek} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/interestQuiz" render={(props) => <InterestQuiz {...props} skipQuiz={this.skipQuiz} finishQuiz={this.finishQuiz} />}/>
                    {default_route}
                  </Switch>
                </IonRouterOutlet>
                {(this.state.isAuthenticated) ?
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="feed" href="/feed">
                      <IonIcon icon={homeOutline} />
                      <IonLabel>FEED</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="explore" href="/explore">
                      <IonIcon icon={searchOutline} />
                      <IonLabel>EXPLORE</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="clubs" href="/myclubs">
                      <IonIcon icon={listCircleOutline} />
                      <IonLabel>MY CLUBS</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="profile" href="/profile">
                      <IonIcon icon={personOutline} />
                      <IonLabel>ME</IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                  :
                  <IonTabBar/>
                }
              
            </IonTabs>
          </IonReactRouter>
        </ClubContext.Provider>
        </UserContext.Provider>
      </IonApp>
    )
  }
}
