import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import './AddEvent.css';


const AddEvent: React.FC<RouteComponentProps> = (props) => {

  const addEvent = () => {
    let name = (document.getElementById("nameID") as HTMLIonInputElement).value;
    let desc = (document.getElementById("descID") as HTMLIonInputElement).value;
    let loc = (document.getElementById("locID") as HTMLIonInputElement).value;
    let date = (document.getElementById("dateID") as HTMLIonInputElement).value;
    let start = (document.getElementById("startID") as HTMLIonInputElement).value;
    let end = (document.getElementById("endID") as HTMLIonInputElement).value;
    console.log(name, desc, loc, date, start, end);
    //make a post call here to send the data to the server
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
                <IonInput id={"nameID"}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonInput id={"descID"}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Location</IonLabel>
                <IonInput id={"locID"}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Date</IonLabel>
                <IonDatetime id={"dateID"}></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel>Start</IonLabel>
                <IonDatetime id={"startID"} display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel>End</IonLabel>
                <IonDatetime id={"endID"} display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
            </IonItem>
                <IonButton onClick={() => addEvent()}id="add-button" expand="full">Add Event</IonButton>
                <IonButton expand="full">Cancel</IonButton>
          </IonContent>
        </IonPage>
    );
};

export default AddEvent;