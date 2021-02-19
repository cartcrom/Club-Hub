import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { ClubContext } from '../ClubContext';

import { IonContent, IonList, IonIcon, IonItem, IonBackButton, IonButton, IonButtons, IonChip, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonInfiniteScroll, IonAvatar } from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import Student from '../components/Student';
import Club from '../components/Club';
import Event from '../components/Event';
import './ClubProfile.css';

import john from '../images/john.jpg'
import ice from '../images/rsz_ice_cream.jpg'

import add from '../images/add.png';

let test_student = new Student("Carter", "Cromer", "id1", "Cal Poly SLO", "ccromer@calpoly.edu", ["social", "recreation", "outdoors", "athletic", "games"], ["1","2","3","4"], ["3"]);
//let test_club = new Club("Ice Cream Club", "id1", "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])

<<<<<<< HEAD
 interface EventButtonProps extends RouteComponentProps {
   id: string;
 }

const RatingButton = (props: EventButtonProps) => {
  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");

  }

  let id = props.id;
  let club = clubs.get(id);

  return(
    <IonItem lines="none" button onClick={() => props.history.push('../addEvent/' + props.id)}>
      <IonAvatar slot="start">
        <img className="club-image" src={add} />
      </IonAvatar>
      <IonLabel className="club-item">
        {"Add an Event"}
      </IonLabel>
    </IonItem>
  )

}




const EventButton = (props: EventButtonProps) => {

  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  let id = props.id;
  let club = clubs.get(id);

  if(club != null){
    if(user.lead_clubs.includes(club.id) ){
      return(
        <IonItem lines="none" button onClick={() => props.history.push('../addEvent/' + props.id)}>
          <IonAvatar slot="start">
            <img className="club-image" src={add} />
          </IonAvatar>
          <IonLabel className="club-item">
            {"Add an Event"}
          </IonLabel>
        </IonItem>
      )
    }
    else{
      return null
    }
  }
  else{
    return null
  }
}

=======
>>>>>>> 583fb3d13451b33b679864687b98bfba750de438
const ClubProfile: React.FC<RouteComponentProps<{id : string}>> = (props) => {

  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  let id = props.match.params.id;
  let club = clubs.get(id);
  if (!club) {
    throw new Error("Undefined club error with ID " + id);
  }

  let feed = club.events.map((e : Event) => e.getFeedItem(false, undefined));

  let tags = club.tags.map(t => <IonChip key={t} className="club-tag">{t}</IonChip>);

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" color="dark"/>
          </IonButtons>
          <IonButtons slot="end">
            {
              (user.lead_clubs.includes(club.id)) && 
              <IonButton onClick={() => props.history.push('../addEvent/' + id)}>
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
          <img className="profile" src={club.profileImage}/>

          <p className="description">
            {club.description}
          </p>

          <button className="following">following</button>

          <div className="club-tags" >
            {
              tags
            }
          </div>
        </div>

        <div className="divider"/>

        <div className="club-content">
          {/* <IonLabel className="club-label">
            {"Events and Meetings"}
          </IonLabel> */}

          <IonItem lines="none" className="content-label">Posts</IonItem>

          <div className="divider"/>

          
          <IonList>
            {feed}
          </IonList>

        </div>

        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  )
}

export default ClubProfile;