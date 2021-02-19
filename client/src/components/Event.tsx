import React from 'react';
import {  IonGrid, IonLabel, IonCol, IonIcon, IonImg, IonItem, IonRow, IonText} from '@ionic/react';
import './Post.css';
import Post from './Post'
import Club from './Club'
import { heart, heartOutline, calendarOutline } from 'ionicons/icons';

function timeSince(date : Date) {

  var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

var aDay = 24*60*60*1000;
console.log(timeSince(new Date(Date.now()-aDay)));
console.log(timeSince(new Date(Date.now()-aDay*2)));



class EventView extends React.Component<{e : Event, useHeader: boolean, route : Function | undefined}, {loved : boolean}> {
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
        {this.props.useHeader && 
          <IonRow className='post-header' onClick={() => this.props.route!()}>
            <IonImg src={e.club.profileImage} className="post-profile-image"></IonImg>
            <IonCol size="auto">
              <IonLabel className='post-club-name'>{e.club.name}</IonLabel>
            </IonCol>
          </IonRow>
        }
        
        <IonRow>
          <div className="container">
            <IonImg className='post-image' src={e.image}></IonImg>
            {/* <div className="bottom-right">
              <IonItem lines="none" className="calendar">
                <IonIcon src={calendarOutline}></IonIcon>
              </IonItem>
              <IonLabel className='event-title'>{"EVENT - " + e.title}</IonLabel>
              <IonLabel className='event-date'>{e.eventDate}</IonLabel>
            </div> */}
          </div>
        </IonRow>
        {/* <IonRow className="event-info">
          
        </IonRow> */}

        <IonRow className="event-data">
          <IonItem lines="none" className="calendar">
            <IonIcon src={calendarOutline}></IonIcon>
          </IonItem>
          
          <IonCol size="8" className="event-description">{"EVENT - " + e.title}</IonCol>
          <IonCol className="event-date">{e.eventDate}</IonCol>
        </IonRow>

        <IonRow>
          <IonItem lines="none">
            <IonIcon className={(this.state.loved) ? "heart" : ""} src={(this.state.loved) ? heart : heartOutline} onClick={() => this.setState({loved: !this.state.loved})}></IonIcon>
          </IonItem>
          
          <IonCol className="event-description">{e.description}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
              {timeSince(new Date(e.date))}
            </IonCol>
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

  constructor(club : Club, id: string, description: string, date: Date, image: string,
    title: string, eventDate: string, eventTime: string, location: string) {
    super(club, id, description, date, image);
    this.title = title;
    this.eventDate = eventDate;
    this.eventTime = eventTime;
    this.location = location;
  }

  getFeedItem(useHeader: boolean, route: Function | undefined) {
    return (
      <EventView e={this} route={route} useHeader={useHeader} key={this.id}/>
    )
  }
}