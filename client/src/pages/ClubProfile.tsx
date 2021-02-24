import React, {useContext, useState} from 'react';
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
import axios from 'axios';

let test_student = new Student("Carter", "Cromer", "id1", "Cal Poly SLO", "ccromer@calpoly.edu", ["social", "recreation", "outdoors", "athletic", "games"], ["1","2","3","4"], ["3"]);
//let test_club = new Club("Ice Cream Club", "id1", "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])

 interface EventButtonProps extends RouteComponentProps {
   id: string;
 }

async function joinClubBackend(studentId: string, clubId: string) {
  const joinClubData = { studentId, clubId };
  try {
    const res = axios.post('http://localhost:5000/joinClub', joinClubData);
    console.log(res);
  }
  catch (e) {
    console.error(e);
  }
}

async function leaveClubBackend(studentId: string, clubId: string) {
  const joinClubData = { studentId, clubId };
  try {
    const res = axios.post('http://localhost:5000/leaveClub', joinClubData);
    console.log(res);
  }
  catch (e) {
    console.error(e);
  }
}



const ClubProfile: React.FC<RouteComponentProps<{id : string}>> = (props) => {

  function joinButton(student: Student | undefined, club: Club | undefined){
    if(student != undefined && club!= undefined){
      if(student.joined_clubs.includes(club.id)){
        leaveClubBackend(student.id, club.id)
        student.joined_clubs = student.joined_clubs.filter((item) => item != club.id? item : null)
        setHasJoined(false)
        
      }
      else{
        joinClubBackend(student.id, club.id)
        student.joined_clubs.push(club.id)
        setHasJoined(true)
      }
    }
  }

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

  let joined = user.joined_clubs.includes(club.id)
  const [hasJoined, setHasJoined] = useState(joined);
  

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

          <button className="following" onClick={() =>joinButton(user , club)}> {hasJoined? "Following" : "Join"} </button>

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