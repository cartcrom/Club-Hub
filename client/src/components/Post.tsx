import React from 'react';
import Club from './Club'
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Post.css';
import heart from '../images/rsz_heart.png'

export default class Post {
  protected club : Club;
  protected id: number;
  protected description: string;
  protected date: string;
  protected image: string;


  constructor(club : Club, id: number, description: string, date: string, image: string) {
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