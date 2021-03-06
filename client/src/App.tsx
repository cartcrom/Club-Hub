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

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

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
  hasTakenQuiz: boolean;
  skipQuiz: boolean;
  user: Student | undefined;
  club_data: Map<string, Club> | undefined;
};

export default class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: false,
      hasTakenQuiz: false,
      skipQuiz: false,
      user: undefined,
      club_data: undefined
    };
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState({
      isAuthenticated: false, // Can probably call the browser to find any recent auth rather than default to false
      hasTakenQuiz: false,    // Should actually be set by data received from server
      skipQuiz: false         // Default to false
    });

    //Auto Login, remove later
    document.addEventListener("keydown", this.logIn, false);
  }

  // After the component did mount, we set the state
  componentDidMount() {
  }

  componentWillUnmount() {
    //Auto Login, remove later
    document.removeEventListener("keydown", this.logIn, false);
  }

  fetch_club_data() {
    API.getAllClubs((clubs: Map<string, Club>) =>
      this.setState({ club_data: clubs })
    );
  }

  authenticate = (user: any) => {
    if (user) {
      this.setState({ user: user });
      this.fetch_club_data();
    }
    else {
      this.setState({ user: new Student("Guest", "", "", "", "", [], [], []) });
      this.setState({ club_data: new Map<string, Club>() });
    }

    history.push("/");

    this.setState({ isAuthenticated: true });
  };

  addClub = (newClub: any) => {
    console.log("Adding a new Club!");
    // Add club to club_data

    this.setState(prevState => {
      if (prevState.club_data === undefined) {
        return {
          club_data: new Map<string, Club>([[newClub._id, backendToClub(newClub)]])
        };
      }
      else {
        const prevClubs = Array.from(prevState.club_data.entries());
        return {
          club_data: new Map<string, Club>([...prevClubs, [newClub._id, backendToClub(newClub)]])
        };
      }
    });
    // Add clubId to user"s lead_clubs
    this.setState(prevState => {
      if (prevState.user !== undefined) {
        const userCopy: Student = Object.assign(Object.create(Object.getPrototypeOf(prevState.user)), prevState.user);
        userCopy.addLeadClub(newClub._id);
        return { user: userCopy };
      }
      else {
        return { user: undefined };
      }
    });
  };

  logOut = () => {
    API.logout(() => { });
    this.setState({ isAuthenticated: false, user: undefined, club_data: undefined });
    history.push("/");
  };

  setUser = (u: any) => {
    this.setState({
      user: new Student(
        u.firstName,
        u.lastName,
        u._id,
        u.school,
        u.email,
        ["social", "recreation", "outdoors", "athletic", "games"],
        ["John Club", "John Club 2"],
        ["Ice Cream Club"],
        "",
        "",
        undefined
      )
    });
  };

  skipQuiz = () => {
    this.setState({
      skipQuiz: true
    });
  };

  finishQuiz = (interests: Array<string>, school: string, college: string, major: string) => {

    const user = this.state.user;

    this.setState({
      hasTakenQuiz: true,
      user: new Student(
        user!.fn,
        user!.ln,
        user!.id,
        school,
        user!.email,
        interests,
        user!.joined_clubs,
        user!.lead_clubs,
        major,
        college,
        user!.favoriteClubType
      )
    });
  };

  // render will know everything!
  render() {

    const isauth = this.state.isAuthenticated;
    let default_route = <Route render={() => <Redirect to="/login" />} exact={true} />;

    if (this.state.isAuthenticated) {
      if (this.state.hasTakenQuiz) {
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
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/addEvent/:id" component={AddEvent} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/clubColleges" component={ClubColleges} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/daysOfWeek" component={DaysOfWeek} />
                    <ProtectedRoute {...ProtectedRouteProps} exact={true} path="/interestQuiz" render={(props) => <InterestQuiz {...props} skipQuiz={this.skipQuiz} finishQuiz={this.finishQuiz} />} />
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
    API.login({ email: "maxkennedy@school.edu", password: "1234" }, (data: Object) => this.authenticate(data), (err: any) => alert(err));
  };

}


