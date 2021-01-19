import React from 'react';
import Club from './Club'
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { heart } from 'ionicons/icons';
import './Post.css';

export default class Post {
  club : Club;
  id: string;
  description: string;
  date: string;
  image: string;


  constructor(club : Club, id: string, description: string, date: string, image: string) {
    this.club = club;
    this.id = id;
    this.description = description;
    this.date = date;
    this.image = image;
  }

  getFeedItem() {
    return (
      <IonItem>
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