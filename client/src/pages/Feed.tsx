import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { ClubContext } from "../ClubContext";
import { IonContent, IonHeader, IonInfiniteScroll, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Feed.css";
import "../global_styles.css";
import Event from "../components/Event";
import Club from "../components/Club";
import Student from "../components/Student";
import { RouteComponentProps } from "react-router";

function sort_by_date(a: Event, b: Event) {  
  let dateA = new Date(a.date).getTime(); 
  let dateB = new Date(b.date).getTime();
  console.log(new Date(a.date))
  console.log(a.date)
  console.log(dateA > dateB ? 1 : -1)
  return dateA > dateB ? -1 : 1;  
};  

const Feed: React.FC<RouteComponentProps> = (props) => {

  const user: Student | undefined = useContext(UserContext);
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  const clubs: Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    return(<div></div>)
  }

  function fetch_posts() {
    let events: Array<Event> = [];
    if (user && user?.fn !== "Guest" && clubs) {  //If logged in & clubs loaded
      for (const id of user.joined_clubs) {
        const club = clubs.get(id);
        if (!club) {
          throw new Error("Undefined club error with club ID: " + id);
        }
        else {
          club.events.forEach((e: Event) => events.push(e));
        }
      }
  
      for (const id of user.lead_clubs) {
        const club = clubs.get(id);
        if (!club) {
          throw new Error("Undefined club error with club ID: " + id);
        }
        else {
          club.events.forEach((e: Event) => events.push(e));
        }
      }
    }
    else if (clubs) {   // If guest user has clubs loaded
      Array.from(clubs!.values()).forEach(club => events = events.concat(club.events))
    }
    
    let sorted_events = events.sort(sort_by_date)
    const feed: Array<JSX.Element> = [];
    sorted_events.forEach((event: Event) =>
      feed.push(event.getFeedItem(true, () => props.history.push("club/" + event.club.id)))
    );
    return feed;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle >ClubHub</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInfiniteScroll>
          <IonList>
            {fetch_posts()}
          </IonList>
        </IonInfiniteScroll>

      </IonContent>
    </IonPage>
  );
};

export default Feed;
