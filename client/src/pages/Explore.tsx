import React, { useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Explore.css';
import { RouteComponentProps } from 'react-router';
import Post from '../components/Post';
import Event from '../components/Event';
import ClubCard from '../components/ClubCard';
import Club from '../components/Club';

import club from '../images/ClubSoda.jpg'
import ice from '../images/rsz_ice_cream.jpg';
import john from '../images/john.jpg';

function fetch_posts() {

  // Call backend here to get posts, for now use this sample data
  //Needed information: Club Name, Club id, Club description, club profile picture, club banner picture, club leadedrs, club school, club tags, meeting, social media, events
  //Note: not all the things listed above may always be necessary, but currently I use the existing club struct which needs all those pieces of info.

  let test_club = new Club("Cal Poly Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], []);

  let test_card = new ClubCard(test_club, 2, club, ["Recreational", "Food", "Poppin'"]);

  let cards : Array<ClubCard> = [test_card];

  let feed : Array<JSX.Element> = [];
  cards.forEach((card : ClubCard) => 
    feed.push(card.getExploreItem())
  )
  return feed;
}

const Tab2: React.FC<RouteComponentProps> = (props) => {
  
  const [text, setText] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
          <IonSearchbar  className="search" value={text} placeholder="Search Clubs" onIonChange={e => setText(e.detail.value!)}></IonSearchbar>
       
        <IonRow>
          <IonGrid>
            <IonChip className="tag">Recreational</IonChip>
            <IonChip  className="tag">Food</IonChip>
            <IonChip className="tag">Poppin'</IonChip>
          </IonGrid>
        </IonRow>
        <IonText className="listHeader">Recommended</IonText>
        <IonList>
          {fetch_posts()}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
