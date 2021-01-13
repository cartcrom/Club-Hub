import React from 'react';
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
import {UserContext} from './user-context';
import Student from './components/Student';

// put 'md' here for android view, put 'ios' here for ios view
setupConfig({
  mode: 'ios'
});

type AppState = {
  isAuthenticated: boolean;
  hasTakenQuiz: boolean;
  skipQuiz: boolean;
  user: Student | undefined
}

export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
      isAuthenticated: false, 
      hasTakenQuiz: false,
      skipQuiz: false,
      user: undefined
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

  setLogin = (login : boolean) => {
    this.setState({isAuthenticated : login});
  }

  setUser = (u : any) => {
    this.setState({user: new Student(
      u.name,
      u.name,
      u._id,
      u.school,
      u.email,
      ["social", "recreation", "outdoors", "athletic", "games"],
      ["1","2","3","4"],
      ["3"]
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
    
    let default_route = (this.state.hasTakenQuiz || this.state.skipQuiz) ?
      <Route render={() => <Redirect to="/feed" />} exact={true} />
      : <Route render={() => <Redirect to="/interestQuiz" />} exact={true} />

    if (this.state.isAuthenticated) {
      return (
        <IonApp>
          <UserContext.Provider value={this.state.user}>
            <IonReactRouter>
              <IonTabs> 
                <IonRouterOutlet>
                  <Route path="/feed" component={Feed} exact={true} />
                  <Route path="/explore" component={Explore} exact={true} />
                  <Route path="/myclubs" component={MyClubs} />
                  <Route path="/club/:name" component={ClubProfile} />            
                  <Route path="/profile" component={UserSettings} />            
                  <Route path="/clubRegistration" component={ClubRegistration} />
                  <Route path="/addEvent" component={AddEvent} />
                  <Route path="/clubTypes" component={ClubTypes} />
                  <Route path="/clubColleges" component={ClubColleges} />
                  <Route path="/clubSocials" component={ClubSocials} />
                  <Route path="/daysOfWeek" component={DaysOfWeek} />
                  <Route path="/interestQuiz" render={(props) => <InterestQuiz {...props} skipQuiz={this.skipQuiz} finishQuiz={this.finishQuiz} />}/>
                  {default_route}
                  
                </IonRouterOutlet>
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
              </IonTabs>
            </IonReactRouter>
          </UserContext.Provider>
        </IonApp>
      )
    }
    else {
      return (
        <IonApp>
          <UserContext.Provider value={this.state.user}>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/signin" render={(props) => <SignIn {...props} setLogin={this.setLogin} setUser={this.setUser} />}/>
                <Route path="/signup" render={(props) => <SignUp {...props} setLogin={this.setLogin} />} />
                <Route path="/login"  render={(props) => <FrontPage {...props} setLogin={this.setLogin} />} />
                <Route render={() => <Redirect to="/login" />} exact={true} />
              </IonRouterOutlet>
            </IonReactRouter>
          </UserContext.Provider>
        </IonApp>
      )
    }
  }
}

// function PrivateRoute({ children, ...rest }) {
//   let auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }
