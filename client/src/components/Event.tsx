import React from 'react';
import {  IonGrid, IonLabel, IonCol, IonIcon, IonImg, IonItem, IonRow} from '@ionic/react';
import './Post.css';
import Post from './Post'
import Club from './Club'
import { heart, heartOutline, calendarOutline } from 'ionicons/icons';

class EventView extends React.Component<{e : Event}, {loved : boolean}> {
  constructor(props: any) {
    super(props)
    this.state = {
      loved : false
    }
  }

  render() {
    let e = this.props.e;

    return (
      <IonGrid className='post'>
        <IonRow className='post-header'>
            <IonImg src={e.club.profileImage} className="post-profile-image"></IonImg>
          <IonCol size="auto">
            <IonLabel className='post-club-name'>{e.club.name}</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <div className="container">
            <IonImg className='post-image' src={e.image}></IonImg>
            <div className="bottom-right">
              <IonItem lines="none" className="calendar">
                <IonIcon src={calendarOutline}></IonIcon>
              </IonItem>
              <IonLabel className='event-title'>{"EVENT - " + e.title}</IonLabel>
              <IonLabel className='event-date'>{e.eventDate}</IonLabel>
            </div>
          </div>
        </IonRow>
        <IonRow className="event-info">
          
        </IonRow>
        <IonRow>
          <IonItem lines="none">
            <IonIcon className={(this.state.loved) ? "heart" : ""} src={(this.state.loved) ? heart : heartOutline} onClick={() => this.setState({loved: !this.state.loved})}></IonIcon>
          </IonItem>
          
          <IonCol className="event-description">{e.description}</IonCol>
        </IonRow>

      </IonGrid>
    )
  }
}

export default class Event extends Post {
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  loved: boolean = false;

  constructor(club : Club, id: string, description: string, date: string, image: string,
    title: string, eventDate: string, eventTime: string, location: string) {
    super(club, id, description, date, image);
    this.title = title;
    this.eventDate = eventDate;
    this.eventTime = eventTime;
    this.location = location;
  }

  getFeedItem() {
    return (
      <EventView e={this} key={this.id}/>
      // <IonItem key={this.id}>
      //   <IonCol >
      //       <IonRow className="club-banner">
      //         <IonImg src={this.club.profileImage} className="post-profile-image"></IonImg>
      //         <IonCol>
      //           <IonText>{this.club.name}</IonText>
      //         </IonCol>
      //       </IonRow>
      //     <IonRow><IonImg src={this.image}></IonImg></IonRow>
      //     <IonItemDivider className="details">
      //       <IonCol>{this.title}</IonCol>
      //       <IonCol>{this.eventDate}</IonCol>
      //       <IonCol>{this.eventTime}</IonCol>
      //     </IonItemDivider>
      //     <IonRow>
      //       <IonImg src={heart}></IonImg>
      //       <IonCol>{this.description}</IonCol>
      //     </IonRow>
      //   </IonCol>
      // </IonItem>
    )
  }
}