import React, { useContext, useState } from 'react';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Explore.css';
import { RouteComponentProps } from 'react-router';
import Post from '../components/Post';
import Event from '../components/Event';
import ClubCard from '../components/ClubCard';
import Club from '../components/Club';
import { ClubContext } from '../ClubContext';

import club from '../images/ClubSoda.jpg'
import ice from '../images/rsz_ice_cream.jpg';
import john from '../images/john.jpg';

import add from '../images/add.png'

const AddButton = (props: RouteComponentProps) => {
    return(
      <IonItem title="addButton" lines="none" button onClick={() => props.history.push('addEvent')}>
        <IonAvatar slot="start">
          <img className="club-image" src={add} />
        </IonAvatar>
        <IonLabel className="club-item">
          {"Add an Event"}
        </IonLabel>
      </IonItem>
    )
  }


const Explore: React.FC<RouteComponentProps> = (props) => {

  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  function fetch_posts() {

    // Call backend here to get posts, for now use this sample data
    //Needed information: Club Name, Club id, Club description, club profile picture, club banner picture, club leadedrs, club school, club tags, meeting, social media, events
    //Note: not all the things listed above may always be necessary, but currently I use the existing club struct which needs all those pieces of info.
  
    //let test_club = new Club("Cal Poly Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], []);

    const selectClub = (name : string) => {
      let club = clubs?.get(name)
      if (club === undefined){
         club = new Club("Cal Poly Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])
      }
      return club
    }
  
    let test_card = new ClubCard(selectClub("Cal Poly Ice Cream Club"), 2, club, ["Recreational", "Food", "Poppin'"]);
  
    let cards : Array<ClubCard> = [test_card];
  
    let feed : Array<JSX.Element> = [];
    cards.forEach((card : ClubCard) => 
      feed.push(card.getExploreItem())
    )
    return feed;
  }
  
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
        <AddButton {...props} />
      </IonContent>
    </IonPage>
  );
};

export default Explore;
