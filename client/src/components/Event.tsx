import React from "react";
import { IonGrid, IonLabel, IonCol, IonIcon, IonImg, IonItem, IonRow, IonText } from "@ionic/react";
import "./Event.css";
import Club from "./Club";
import { heart, heartOutline, calendarOutline } from "ionicons/icons";

function timeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

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

class EventView extends React.Component<{ e: Event, useHeader: boolean, route: Function | undefined; }, { loved: boolean; }> {
  constructor(props: any) {
    super(props);
    this.state = {
      loved: false
    };
  }

  render() {
    const e = this.props.e;

    return (
      <IonGrid className="post">
        {this.props.useHeader &&
          <IonRow className="post-header" onClick={() => this.props.route!()}>
            <IonImg src={e.club.profileImage} className="post-profile-image"></IonImg>
            <IonCol size="auto">
              <IonLabel className="post-club-name">{e.club.name}</IonLabel>
            </IonCol>
          </IonRow>
        }

        <IonRow>
          <div className="container">
            <IonImg className="post-image" src={e.image}></IonImg>
          </div>
        </IonRow>
        <IonRow>
          <div className="event-data">
            <IonIcon className="calendar" src={calendarOutline}></IonIcon>
            <div className="event-title">{"EVENT - " + e.title}</div>
            <div className="event-date">{e.eventDate}</div>
          </div>
        </IonRow>

        <IonRow>
          <div className="post-data">
            <IonIcon className={(this.state.loved) ? "calendar heart" : "calendar"} src={(this.state.loved) ? heart : heartOutline} onClick={() => this.setState({ loved: !this.state.loved })}></IonIcon>
            <div className="post-description">{e.description}</div>
          </div>
        </IonRow>

        <IonRow>
          <IonText className="post-timesince">
            {timeSince(new Date(e.date))}
          </IonText>
        </IonRow>

      </IonGrid>
    );
  }
}

export default class Event {
  club: Club;
  id: string;
  description: string;
  date: Date;
  image: string;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  loved: boolean = false;

  constructor(club: Club, id: string, description: string, date: Date, image: string,
    title: string, eventDate: string, eventTime: string, location: string) {
    this.club = club;
    this.id = id;
    this.description = description;
    this.date = date;
    this.image = image;
    this.title = title;
    this.eventDate = eventDate;
    this.eventTime = eventTime;
    this.location = location;
  }

  getFeedItem(useHeader: boolean, route: Function | undefined) {
    return (
      <EventView e={this} route={route} useHeader={useHeader} key={this.id} />
    );
  }
}