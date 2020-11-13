import React from 'react';
import { IonContent, IonItem, IonItemDivider, IonAvatar, IonLabel, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonInfiniteScroll } from '@ionic/react';
import './MyClubs.css';
import Club from '../components/Club';
import { RouteComponentProps } from 'react-router';

import john from '../images/john.jpg';
import ice from '../images/rsz_ice_cream.jpg';
import add from '../images/add.png'

let test_club = new Club("Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])
let test_club2 = new Club("John Club", 1, "A club for people who like John", john, john, [], "Cal Poly SLO", [], undefined, [], [])
let test_club3 = new Club("John Club 2", 1, "A club for people who like John even more", john, john, [], "Cal Poly SLO", [], undefined, [], [])

let my_lead_clubs = [test_club, test_club2];
let my_clubs = [test_club3];

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

const MyClubs: React.FC<RouteComponentProps> = (props) => {

  const selectClub = (name : string) => {
    props.history.push('clubRegistration')
  }

  const ClubView = (data : {club: Club}) => {
    return(
      <IonItem lines="none" button onClick={() => {props.history.push('club/' + data.club.name) }}>
        <IonAvatar slot="start">
          <img src={data.club.profileImage} />
        </IonAvatar>
        <IonLabel className="club-item">
          {data.club.name}
        </IonLabel>
      </IonItem>
    )
  }

  let lead_clubs_view : Array<JSX.Element> = [];
  my_lead_clubs.forEach(club => lead_clubs_view.push(<ClubView key={club.name} club={club}/>))
  
  let clubs_view : Array<JSX.Element> = [];
  my_clubs.forEach(club => clubs_view.push(<ClubView key={club.name} club={club}/>))


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
          { lead_clubs_view }
          <AddButton {...props} />

          <div className="divider"/>

          <IonItem lines="none">
            <IonLabel className="clubs-label">
              {"Clubs I'm in"}
            </IonLabel>
          </IonItem>

          { clubs_view }

        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default MyClubs;
