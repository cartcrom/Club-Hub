import React, { useRef } from 'react';
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';

import john from '../images/john.jpg'
import heart from '../images/rsz_heart.png'
import ice from '../images/rsz_ice_cream.jpg'


const Tab1: React.FC = () => {
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle >ClubHub</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonInfiniteScroll>
            <IonList>
              <IonItem>
                <IonCol>
                  <IonItemDivider className="club-banner" > 
                    <IonRow>
                      <IonImg src={ice} className="image"></IonImg>
                      <IonCol>
                        <IonText>Cal Poly Ice Cream Club</IonText>
                      </IonCol>
                    </IonRow>
                  </IonItemDivider>
                  <IonRow><IonImg src={john}></IonImg></IonRow>
                  <IonItemDivider className="details">
                    <IonCol>Agressive Ice Cream Eating</IonCol>
                    <IonCol>May 2nd</IonCol>
                    <IonCol>12pm - 5pm</IonCol>
                  </IonItemDivider>
                  <IonRow>
                    <IonImg src={heart}></IonImg>
                    <IonCol>Eat ice cream angrily</IonCol>
                  </IonRow>
                </IonCol>
              </IonItem>
            </IonList>
          </IonInfiniteScroll>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
