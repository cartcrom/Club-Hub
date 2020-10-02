import React from 'react';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonInfiniteScroll>
            <IonList>
              <IonItem button>
                <IonImg src={"/Users/lukeunderwood/Desktop/Club-Hub/client/public/assets/icon/favicon.png"}></IonImg>
                <IonCol>
                  <IonTitle>Club Picnic</IonTitle>
                  <IonText>May 4th | 6pm-7pm | Dexter Lawn</IonText>
                </IonCol>
                <IonText>Come enjoy some delicious food at our club social!</IonText>
              </IonItem>
              <IonItem button>
              <IonImg src={"/client/public/assets/icon/favicon.ico"}></IonImg>
                <IonCol>
                  <IonTitle>Event Name</IonTitle>
                  <IonText>Date of Event at Location of Event</IonText>
                </IonCol>
                <IonText>Short Description of Event</IonText>
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
