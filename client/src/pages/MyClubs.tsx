import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { ClubContext } from "../ClubContext";
import Student from "../components/Student";
import Club from "../components/Club";
import add from "../images/add.png";
import { IonContent, IonItem, IonAvatar, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonInfiniteScroll } from "@ionic/react";
import "./MyClubs.css";
import { RouteComponentProps } from "react-router";

const AddButton = (props: RouteComponentProps) => {
  return (
    <IonItem lines="none" button onClick={() => props.history.push("clubRegistration")}>
      <IonAvatar slot="start">
        <img className="club-image" src={add} />
      </IonAvatar>
      <IonLabel className="club-item">
        {"Register your club"}
      </IonLabel>
    </IonItem>
  );
};

const MyClubs: React.FC<RouteComponentProps> = (props) => {
  const user: Student | undefined = useContext(UserContext);
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  const clubs: Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  const ClubView = (data: { club: Club; }) => {
    return (
      <IonItem lines="none" button onClick={() => { props.history.push("club/" + data.club.id); }}>
        <IonAvatar slot="start">
          <img src={data.club.profileImage} />
        </IonAvatar>
        <IonLabel className="club-item">
          {data.club.name}
        </IonLabel>
      </IonItem>
    );
  };

  const lead_clubs_view: Array<JSX.Element> = [];
  const clubs_view: Array<JSX.Element> = [];

  // Create frames for each club
  for (const id of user.joined_clubs) {
    const club = clubs.get(id);
    if (!club) {
      throw new Error("Undefined club error with club ID: " + id);
    }
    else {
      clubs_view.push(<ClubView key={club.name} club={club} />);
    }
  }

  // Create frames for each lead club
  for (const id of user.lead_clubs) {
    const club = clubs.get(id);
    if (!club) {
      throw new Error("Undefined lead club error with club ID: " + id);
    }
    else {
      lead_clubs_view.push(<ClubView key={club.name} club={club} />);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Clubs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInfiniteScroll>
          <IonItem lines="none">
            <IonLabel className="clubs-label">
              {"Clubs I lead"}
            </IonLabel>
          </IonItem>
          {lead_clubs_view}
          {user.id && <AddButton {...props} />}

          <div className="divider" />

          <IonItem lines="none">
            <IonLabel className="clubs-label">
              {"Clubs I'm in"}
            </IonLabel>
          </IonItem>

          {clubs_view}

        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default MyClubs;
