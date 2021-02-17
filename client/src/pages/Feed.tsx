import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ClubContext } from '../ClubContext';
import {  IonContent, IonHeader,IonInfiniteScroll, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Feed.css';
import '../global_styles.css';
import Post from '../components/Post';
import Event from '../components/Event';
import Club from '../components/Club';
import Student from '../components/Student';
import { RouteComponentProps } from 'react-router';

const Feed: React.FC<RouteComponentProps> = (props) => {

  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  function fetch_posts() {

    let posts : Array<Event> = [];

    if (!user || !clubs)
      return;

    // Create frames for each club
    for (let id of user.joined_clubs) {
      let club = clubs.get(id);
      if (!club) {
        throw new Error("Undefined club error with club ID: " + id);
      }
      else {
        club.events.forEach((e : Event) => posts.push(e))
      }
    }

    for (let id of user.lead_clubs) {
      let club = clubs.get(id);
      if (!club) {
        throw new Error("Undefined club error with club ID: " + id);
      }
      else {
        club.events.forEach((e : Event) => posts.push(e))
      }
    }
  
    let feed : Array<JSX.Element> = [];
    posts.forEach((post : Post) => 
      feed.push(post.getFeedItem(true, () => props.history.push('club/' + post.club.id)))
    )
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
