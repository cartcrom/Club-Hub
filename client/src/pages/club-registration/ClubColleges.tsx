import React from "react";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonRadioGroup, IonRadio, IonLabel } from "@ionic/react";

const ClubColleges: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Club College</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRadioGroup>
          <IonItem>
            <IonRadio slot="start" />
            <IonLabel>CAED</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio slot="start" />
            <IonLabel>CAFES</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio slot="start" />
            <IonLabel>CENG</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio slot="start" />
            <IonLabel>CLA</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio slot="start" />
            <IonLabel>COB</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio slot="start" />
            <IonLabel>COSAM</IonLabel>
          </IonItem>
        </IonRadioGroup>
      </IonContent>
    </IonPage>

  );
};
export default ClubColleges;