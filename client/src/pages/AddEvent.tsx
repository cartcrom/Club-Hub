import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router';

const AddEvent: React.FC<RouteComponentProps> = (props) => {

    const nameInputRef = useRef<HTMLIonInputElement>(null);
  var eventList = useRef<HTMLIonListElement>(null);
  const doTheThing = () => {
    const name = nameInputRef.current?.value;
    eventList.current?.append("hi");
    eventList.current?.append("\n");
    console.log(name);
  }
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Rough Event Adder</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonItem>
                <IonLabel position="floating">Event Title</IonLabel>
                <IonInput ref={nameInputRef}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Event Description</IonLabel>
                <IonInput></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Start</IonLabel>
                <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel>End</IonLabel>
                <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
            </IonItem>
            <IonButton onClick={doTheThing} id="add-button">Add Event</IonButton>
            <IonList ref={eventList}></IonList>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Tab 3</IonTitle>
              </IonToolbar>
            </IonHeader>
          </IonContent>
        </IonPage>
    );
};

export default AddEvent;