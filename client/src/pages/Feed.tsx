import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ClubContext } from '../ClubContext';
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Feed.css';
import '../global_styles.css';
import Post from '../components/Post';
import Event from '../components/Event';
import Club from '../components/Club';
import Student from '../components/Student';

import john from '../images/john.jpg'
import ice from '../images/rsz_ice_cream.jpg'
import { returnUpForwardSharp } from 'ionicons/icons';





const Feed: React.FC = () => {

  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  function fetch_posts() {
    // Call backend here to get posts, for now use this sample data
  
    //let test_club = new Club("Cal Poly Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])

    

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
      feed.push(post.getFeedItem())
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
