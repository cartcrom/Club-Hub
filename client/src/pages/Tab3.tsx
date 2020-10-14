import React from 'react';
import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { RouteComponentProps } from 'react-router';

const Tab3: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>My Clubs</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonButton color="primary" size="large" expand="block" onClick={() => props.history.push('clubRegistration')}>Register Your Club!</IonButton>
      <ExploreContainer name="Tab 2 page" />
    </IonContent>
  </IonPage>
  );
};

export default Tab3;
