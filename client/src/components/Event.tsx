import React from 'react';
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Post.css';
import Post from './Post'
import Club from './Club'
import heart from '../images/rsz_heart.png'

export default class Event extends Post {
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;

  constructor(club : Club, id: number, description: string, date: string, image: string,
    title: string, eventDate: string, eventTime: string, location: string) {
    super(club, id, description, date, image);
    this.title = title;
    this.eventDate = eventDate;
    this.eventTime = eventTime;
    this.location = location;
  }

  getFeedItem() {
    return (
      <IonItem key={this.id}>
        <IonCol>
          <IonItemDivider className="club-banner" > 
            <IonRow>
              <IonImg src={this.club.profileImage} className="image"></IonImg>
              <IonCol>
                <IonText>{this.club.name}</IonText>
              </IonCol>
            </IonRow>
          </IonItemDivider>
          <IonRow><IonImg src={this.image}></IonImg></IonRow>
          <IonItemDivider className="details">
            <IonCol>{this.title}</IonCol>
            <IonCol>{this.eventDate}</IonCol>
            <IonCol>{this.eventTime}</IonCol>
          </IonItemDivider>
          <IonRow>
            <IonImg src={heart}></IonImg>
            <IonCol>{this.description}</IonCol>
          </IonRow>
        </IonCol>
      </IonItem>
    )
  }
}