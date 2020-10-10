import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { RouteComponentProps } from 'react-router';

const Tab2: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton color="primary" size="large" expand="block" onClick={() => props.history.push('clubRegistration')}>Register Your Club!</IonButton>
        <IonButton onClick={() => props.history.push('frontPage')}>Go To Front Page</IonButton>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
