import React from 'react';
import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { RouteComponentProps } from 'react-router';

const Tab4: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>User Settings</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <ExploreContainer name="Tab 2 page" />
    </IonContent>
  </IonPage>
  );
};

export default Tab4;
