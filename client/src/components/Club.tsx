import React from 'react';
import Student from './Student';
//import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';

export default class Club {
  name : string;
  id: Number;
  description: string;
  profileImage: string;
  bannerImage: string;
  clubLeaders: Array<Student>
  school: string;
  tags: Array<string>;
  meetings?: Array<Event>;
  socialMedia: Array<string>
  events: Array<Event>

  constructor(name : string, id: number, description: string, profileImage: string, bannerImage: string, clubLeaders: Array<Student>,
    school: string, tags: Array<string>, meetings: Array<Event> | undefined, socialMedia: Array<string>, events: Array<Event>) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.profileImage = profileImage;
    this.bannerImage = bannerImage;
    this.clubLeaders = clubLeaders;
    this.school = school;
    this.tags = tags;
    this.meetings = meetings;
    this.socialMedia = socialMedia;
    this.events = events;
  }

  // Method
  getId() {
    return this.id;
  }
}