import { IonAvatar, IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import './AddEvent.css';


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
            <IonToolbar className="header">
              <IonTitle>Event Adder</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonItem>
                <IonLabel position="floating">Title</IonLabel>
                <IonInput ref={nameInputRef}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonInput></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Location</IonLabel>
                <IonInput ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Date</IonLabel>
                <IonDatetime></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel>Start</IonLabel>
                <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel>End</IonLabel>
                <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
            </IonItem>
                <IonButton id="add-button" expand="full">Add Event</IonButton>
                <IonButton expand="full">Cancel</IonButton>
          </IonContent>
        </IonPage>
    );
};

export default AddEvent;