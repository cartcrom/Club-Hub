import React from "react";
import API from "./services/api";
import VerificationPage from "./services/VerificationPage";

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
} from "@ionic/react";

/* Router */
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import history from "./history";

/* UI */
import { homeOutline, searchOutline, listCircleOutline, personOutline } from "ionicons/icons";

/* SignIn */
import SignIn from "./pages/front-pages/SignIn";
import SignUp from "./pages/front-pages/SignUp";
import FrontPage from "./pages/front-pages/FrontPage";

/* Tabs */
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import MyClubs from "./pages/MyClubs";
import ClubProfile from "./pages/ClubProfile";
import UserSettings from "./pages/UserProfile";

/* Components */
import Club from "./components/Club";
import Loader from "./components/Loader/loader.js";

/* Club Registration */
import ClubColleges from "./pages/club-registration/ClubColleges";
import DaysOfWeek from "./pages/club-registration/DaysOfWeek";
import AddEvent from "./pages/AddEvent";

/* Interest Quiz */
import InterestQuiz from "./pages/interest-quiz/InterestQuiz";

/* Global CSS to apply to all components */
import "./global_styles.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "./theme/variables.css";

/* User Context */
import { UserContext } from "./UserContext";
import { ClubContext } from "./ClubContext";
import Student from "./components/Student";

import { backendToClub} from "./components/backendDataConversion";
import { ClubRegistrationManager } from "./pages/club-registration/ClubRegistrationManager";

// put "md" here for android view, put "ios" here for ios view
setupConfig({
  mode: "ios"
});

type AppState = {
  isAuthenticated: boolean;
  user: Student | undefined;
  club_data: Map<string, Club> | undefined;
};

export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: undefined,
      club_data: undefined
    };
  }

  componentWillMount() {
    //Auto Login, remove later
    document.addEventListener("keydown", this.logIn, false);
  }

  componentWillUnmount() {
    //Auto Login, remove later
    document.removeEventListener("keydown", this.logIn, false);
  }

  authenticate = (user: Student | undefined) => {
    if (!user)
      user = new Student("Guest", "", "", "", "", [], [], [])
    this.setState({ user: user });
    
    this.setState({ isAuthenticated: true });
    API.getAllClubs((clubs: Map<string, Club>) => {
      this.setState({ club_data: clubs })
      if (user!.interests.length != 0)
        history.push("/feed");
      else
      history.push("/interestQuiz")
    }
    );
  }

  addClub = (newClub: Club) => {
    console.log("Adding a new Club!");
    // Add club to club_data

    let user = this.state.user
    if (user && this.state.club_data) {
      this.state.club_data.set(newClub.id, newClub)
      user.addLeadClub(newClub.id)
      this.setState({user: user})
    }
  }

  updateEvents = () => {
    history.push("/feed");
    this.setState({ club_data: undefined })
    API.getAllClubs((clubs: Map<string, Club>) => {
      this.setState({ club_data: clubs })
    })
  }

  logOut = () => {
    API.logout(() => { });
    this.setState({ isAuthenticated: false, user: undefined, club_data: undefined });
    history.push("/");
  }

  finishQuiz = (interests: Array<string>, college: string, major: string) => {

    const updated_user = this.state.user;
    if (updated_user) {
      updated_user.interests = interests
      updated_user.collegeOf = college
      updated_user.major = major
    }
    
    this.setState({
      user: updated_user
    });
  };

  // render will know everything!
  render() {

    const isauth = this.state.isAuthenticated;
    let default_route = <Route render={() => <Redirect to="/login" />} exact={true} />;

    if (this.state.isAuthenticated) {
      if (this.state.user!.interests.length > 0) {
        default_route = <Route render={() => <Redirect to="/feed" />} exact={true} />;
      }
      else {
        default_route = <Route render={() => <Redirect to="/interestQuiz" />} exact={true} />;
      }
    }

    const ProtectedRouteProps = { isAuthenticated: this.state.isAuthenticated, authenticationPath: "/login" };

    return (
      <IonApp>
        <UserContext.Provider value={this.state.user}>
          <ClubContext.Provider value={this.state.club_data}>
            {(isauth && !this.state.club_data) &&
              <Loader></Loader>
            }
            <IonReactRouter history={history} basename={process.env.PUBLIC_URL}>
              <IonTabs>
                <IonRouterOutlet>
                  <Switch>
                    <Route path="/signin" render={(props) => (isauth) ? <Redirect to={"/"} /> : <SignIn {...props} authenticate={this.authenticate} />} />
                    <Route path="/signup" render={(props) => (isauth) ? <Redirect to={"/"} /> : <SignUp {...props} authenticate={this.authenticate} />} />
                    <Route path="/login" render={(props) => (isauth) ? <Redirect to={"/"} /> : <FrontPage {...props} authenticate={this.authenticate} />} />
                    <Route path="/verification/:id" component={VerificationPage} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/feed" component={Feed} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/explore" component={Explore} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/myclubs" component={MyClubs} />
                    <ProtectedRoute {...ProtectedRouteProps} path="/club/:id" component={ClubProfile} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/profile" render={(props) => <UserSettings {...props} logOut={(this.logOut)} />} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/addEvent/:id" render={(props) => <AddEvent {...props} updateEvents={this.updateEvents}/>}/>
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/clubColleges" component={ClubColleges} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/daysOfWeek" component={DaysOfWeek} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/interestQuiz" render={(props) => <InterestQuiz {...props} skipQuiz={() => history.push("/feed")} finishQuiz={this.finishQuiz} />} />
                    <ProtectedRoute {...ProtectedRouteProps} path="/clubRegistration" render={(props) => <ClubRegistrationManager {...props} addClub={this.addClub} />} />
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
                  <IonTabBar />
                }

              </IonTabs>
            </IonReactRouter>
          </ClubContext.Provider>
        </UserContext.Provider>
      </IonApp>
    );
  }

  // Auto Login
  logIn = async (event: KeyboardEvent) => {
    if (event.key !== "`") {
      return;
    }
    API.login({ email: "ccromer@calpoly.edu", password: "1234" }, (user: Student) => this.authenticate(user), (err: any) => alert(err));
  };

}


