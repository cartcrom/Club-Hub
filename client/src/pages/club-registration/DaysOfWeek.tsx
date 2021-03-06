import React from "react";
import { IonContent, IonHeader, IonPage, IonItem, IonCheckbox, IonLabel, IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";


const DaysOfWeek: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Meeting Day(s)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Sunday</IonLabel>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Monday</IonLabel>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Tuesday</IonLabel>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Wednesday</IonLabel>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Thursday</IonLabel>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Friday</IonLabel>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Saturday</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
export default DaysOfWeek;