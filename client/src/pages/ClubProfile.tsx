import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { ClubContext } from '../ClubContext';

import { IonContent, IonList, IonBackButton, IonButtons, IonChip, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonInfiniteScroll } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Student from '../components/Student';
import Club from '../components/Club';
import Event from '../components/Event';
import './ClubProfile.css';

import john from '../images/john.jpg'
import ice from '../images/rsz_ice_cream.jpg'

let test_student = new Student("Carter", "Cromer", "id1", "Cal Poly SLO", "ccromer@calpoly.edu", ["social", "recreation", "outdoors", "athletic", "games"], ["1","2","3","4"], ["3"]);
let test_club = new Club("Ice Cream Club", "id1", "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])

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

  let feed : Array<JSX.Element> = [];
  club.events.forEach((e : Event) => feed.push(e.getFeedItem()))

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" color="dark"/>
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
            <IonChip className="club-tag">recreational</IonChip>
            <IonChip  className="club-tag">food</IonChip>
            <IonChip className="club-tag">diverse</IonChip>
            <IonChip className="club-tag club-tag-grey">fun</IonChip>
            <IonChip  className="club-tag club-tag-grey">medium size</IonChip>
            <IonChip className="club-tag club-tag-grey">on campus</IonChip>
          </div>
        </div>

        <div className="divider"/>

        <div className="club-content">
          {/* <IonLabel className="club-label">
            {"Events and Meetings"}
          </IonLabel> */}

          <IonLabel className="club-label">
            {"Posts"}
          </IonLabel>
          
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