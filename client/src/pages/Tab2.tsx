import React, { useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { RouteComponentProps } from 'react-router';

import club from '../images/ClubSoda.jpg'

const Tab2: React.FC<RouteComponentProps> = (props) => {
  
  const [text, setText] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItemDivider>
          <IonSearchbar value={text} placeholder="Search Clubs" onIonChange={e => setText(e.detail.value!)}></IonSearchbar>
        </IonItemDivider>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem  className="tag" detail={false}>Recreational</IonItem>
              </IonCol>
              <IonCol>
                <IonItem  button className="tag" detail={false}>Food</IonItem>
              </IonCol>
              <IonCol>
                <IonItem  button className="tag" detail={false}>Poppin'</IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        <IonText>Recommended</IonText>
        <IonGrid>
          <IonCol>
            <IonCard button>
              <IonImg src={club}></IonImg>
              <IonCardTitle>Club Soda</IonCardTitle>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem color="medium">Recreational</IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem color="medium">Food</IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem color="medium">Poppin'</IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard button>
              <IonImg src = "dunno"></IonImg>
              <IonCardTitle>Club Name</IonCardTitle>
            </IonCard>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
