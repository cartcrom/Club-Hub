import React, { useRef } from 'react';
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Feed.css';
import '../global_styles.css';
import Post from '../components/Post';
import Event from '../components/Event';
import Club from '../components/Club';

import john from '../images/john.jpg'
import ice from '../images/rsz_ice_cream.jpg'


function fetch_posts() {

  // Call backend here to get posts, for now use this sample data

  let test_club = new Club("Cal Poly Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])

  let test_event = new Event(test_club, 1, "Come eat ice cream in an agressive fashion - points for speed and agression", "August 22", john, "Agressive Ice Cream Eating", "October 29", "12PM - 5PM", "Kennedy Lawn");
  let posts : Array<Post> = [test_event, test_event, test_event]

  let feed : Array<JSX.Element> = [];
  posts.forEach((post : Post) => 
    feed.push(post.getFeedItem())
  )
  return feed;
}

const Feed: React.FC = () => {
  

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
