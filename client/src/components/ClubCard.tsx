import React from 'react';
import Club from './Club'
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, IonCard, IonCardTitle, IonGrid, IonChip } from '@ionic/react';
import './ClubCard.css';

export default class Post {
  protected club : Club;
  protected id: number;
  protected image: string;
  protected tags: string[];
    
  constructor(club : Club, id: number, image: string, tags: string[]) {
    this.club = club;
    this.id = id;
    this.image = image;
    this.tags = tags;
  }

  getTags(){
    let id = 0;
    let tags : Array<String> = ["Recreational", "Food"]
    let tagList : Array<JSX.Element> = [];
    tags.forEach((string : String) => 
        tagList.push(<IonChip key={id = id + 1} className="tag">{string}</IonChip>)
  )
  return tagList;
  }

  getExploreItem(){
      return(
        <IonCard key={this.id} button>
            <IonImg src={this.image}></IonImg>
            <IonCardTitle className="cardHeader">{this.club.name}</IonCardTitle>
            <IonGrid>
                {this.getTags()}
            </IonGrid>
      </IonCard>
      )
  }
  
}