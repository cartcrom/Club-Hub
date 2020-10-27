import React, { useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
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
        
          <IonSearchbar  className="search" value={text} placeholder="Search Clubs" onIonChange={e => setText(e.detail.value!)}></IonSearchbar>
       
        <IonRow>
          <IonGrid>
            <IonChip className="tag">Recreational</IonChip>
            <IonChip  className="tag">Food</IonChip>
            <IonChip className="tag">Poppin'</IonChip>
          </IonGrid>
        </IonRow>
        <IonText className="listHeader">Recommended</IonText>
          <IonCol>
            <IonCard button>
              <IonImg src={club}></IonImg>
              <IonCardTitle className="cardHeader">Club Soda</IonCardTitle>
              <IonGrid>
                <IonChip className="tag">Recreational</IonChip>
                <IonChip className="tag">Food</IonChip>
                <IonChip className="tag">Poppin'</IonChip>
              </IonGrid>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard button>
              <IonImg src = "dunno"></IonImg>
              <IonCardTitle>Club Name</IonCardTitle>
            </IonCard>
          </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
