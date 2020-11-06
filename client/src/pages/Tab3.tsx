import React from 'react';
import { IonContent, IonItem, IonItemDivider, IonAvatar, IonLabel, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonInfiniteScroll } from '@ionic/react';
import './Tab3.css';
import Club from '../components/Club';
import { RouteComponentProps } from 'react-router';

import john from '../images/john.jpg';
import ice from '../images/rsz_ice_cream.jpg';
import add from '../images/add.png'

let test_club = new Club("Cal Poly Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])
let test_club2 = new Club("John Club", 1, "A club for people who like John", john, john, [], "Cal Poly SLO", [], undefined, [], [])
let test_club3 = new Club("John Club 2", 1, "A club for people who like John even more", john, john, [], "Cal Poly SLO", [], undefined, [], [])

const ClubView = (props : {club: Club}) => {
  return(
    <IonItem lines="none" button onClick={() => { }}>
      <IonAvatar slot="start">
        <img src={props.club.profileImage} />
      </IonAvatar>
      <IonLabel className="club-item">
        {props.club.name}
      </IonLabel>
    </IonItem>
  )
}

const AddButton = (props: RouteComponentProps) => {
  return(
    <IonItem lines="none" button onClick={() => props.history.push('clubRegistration')}>
      <IonAvatar slot="start">
        <img className="club-image" src={add} />
      </IonAvatar>
      <IonLabel className="club-item">
        {"Register your club"}
      </IonLabel>
    </IonItem>
  )
}

const Tab3: React.FC<RouteComponentProps> = (props) => {
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
          <ClubView club={test_club}/>
          <ClubView club={test_club2}/>
          <AddButton {...props} />

          <div className="divider"/>

          <IonItem lines="none">
            <IonLabel className="clubs-label">
              {"Clubs I'm in"}
            </IonLabel>
          </IonItem>

          <ClubView club={test_club3}/>

        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
