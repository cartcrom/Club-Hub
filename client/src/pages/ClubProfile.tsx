import React from 'react';
import { IonContent, IonBackButton, IonButtons, IonChip, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Student from '../components/Student';
import Club from '../components/Club';
import Event from '../components/Event';
import './ClubProfile.css';

import john from '../images/john.jpg'
import ice from '../images/rsz_ice_cream.jpg'

let test_student = new Student("Carter", "Cromer", 1, "Cal Poly SLO", "ccromer@calpoly.edu", ["social", "recreation", "outdoors", "athletic", "games"], ["1","2","3","4"], ["3"]);
let test_club = new Club("Ice Cream Club", 1, "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", [], undefined, [], [])

let test_event = new Event(test_club, 1, "Eat ice cream angrily", "August 22", john, "Agressive Ice Cream Eating", "October 29", "12PM - 5PM", "Kennedy Lawn");

export default class ClubProfile extends React.Component<RouteComponentProps<{name : string}>, {name: string}> {

  constructor(props: any) {
    super(props)
    this.state = {name: ""};
  }

  // After the component did mount, we set the state
  componentDidMount() {
    let name = this.props.match.params.name;
    console.log(this.props)

    this.setState({name: name})
    console.log(name)
  }

  render() {
    let name = this.state.name;
    return(
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="" color="dark"/>
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        
          <div className="border">
            <img className="banner" src={john}></img>
          </div>

          <div className="club-info">
            <img className="profile" src={ice}/>

            <p className="description">
              This club is all about john. it is about understanding john as a human being and as an idol
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
            <IonLabel className="club-label">
              {"Events and Meetings"}
            </IonLabel>

          </div>
        </IonContent>
      </IonPage>
    )
  }

}