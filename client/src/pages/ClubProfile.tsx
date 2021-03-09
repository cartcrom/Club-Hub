import React, { useContext, useState } from "react";
import API from "../services/api";
import { UserContext } from "../UserContext";
import { ClubContext } from "../ClubContext";
import { IonContent, IonList, IonIcon, IonItem, IonBackButton, IonButton, IonButtons, IonChip, IonHeader, IonPage, IonTitle, IonToolbar, IonInfiniteScroll } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import Student from "../components/Student";
import Club from "../components/Club";
import Event from "../components/Event";
import "./ClubProfile.css";

const ClubProfile: React.FC<RouteComponentProps<{ id: string; }>> = (props) => {

  const user: Student | undefined = useContext(UserContext);
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  const clubs: Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  const id = props.match.params.id;
  const club = clubs.get(id);
  if (!club) {
    throw new Error("Undefined club error with ID " + id);
  }

  const leading = user.lead_clubs.includes(club.id);
  const joined = user.joined_clubs.includes(club.id);
  const [hasJoined, setHasJoined] = useState(joined);

  function joinButton(student: Student | undefined, club: Club | undefined) {
    if (student && club && student.fn == "Guest") {
      student.joined_clubs.push(club.id);
      setHasJoined(true);
    }
    if (student && club) {
      if (student.joined_clubs.includes(club.id)) {
        API.leaveClub(student.id, club.id);
        student.joined_clubs = student.joined_clubs.filter((item) => item != club.id ? item : null);
        setHasJoined(false);

      }
      else {
        API.joinClub(student.id, club.id);
        student.joined_clubs.push(club.id);
        setHasJoined(true);
      }
    }
  }

  const feed = club.events.map((e: Event) => e.getFeedItem(false, undefined));
  const tags = club.tags.map(t => <IonChip key={t} className="club-tag">{t}</IonChip>);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" color="dark" />
          </IonButtons>
          <IonButtons slot="end">
            {
              (user.lead_clubs.includes(club.id)) &&
              <IonButton title="addButton" onClick={() => props.history.push("../addEvent/" + id)}>
                Event
                <IonIcon slot="icon-only" icon={addOutline} />
              </IonButton>
            }

          </IonButtons>
          <IonTitle>{club.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInfiniteScroll>

          <div className="border">
            <img className="banner" src={club.bannerImage}></img>
          </div>

          <div className="club-info">
            <img className="profile" src={club.profileImage} />

            <p className="description">
              {club.description}
            </p>

            {!leading ? <button className="following" onClick={() => joinButton(user, club)}> {hasJoined ? "Following" : "Join"} </button>
              : <button className="following">Leading</button>}

            <div className="club-tags" >
              {
                tags
              }
            </div>
          </div>

          <div className="divider" />

          <div className="club-content">
            {/* <IonLabel className="club-label">
            {"Events and Meetings"}
          </IonLabel> */}

            <IonItem lines="none" className="content-label">Posts</IonItem>

            <div className="divider" />


            <IonList>
              {feed}
            </IonList>

          </div>

        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default ClubProfile;