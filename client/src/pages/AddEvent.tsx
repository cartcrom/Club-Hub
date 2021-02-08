import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ClubContext } from '../ClubContext';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import React, { useRef, useContext} from 'react';
import { RouteComponentProps } from 'react-router';
import './AddEvent.css';
import Club from '../components/Club';
import Event from '../components/Event';

interface AddEventProps extends RouteComponentProps<{id : string}> {
  saveEvent: Function;
}

const AddEvent: React.FC<AddEventProps> = (props) => {

  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
    if (clubs === undefined) {
      throw new Error("Undefined clubs error");
    }

  const addEvent = () => {
    let name = (document.getElementById("nameID") as HTMLIonInputElement).value as string;
    let desc = (document.getElementById("descID") as HTMLIonInputElement).value as string;
    let loc = (document.getElementById("locID") as HTMLIonInputElement).value as string;
    let date = (document.getElementById("dateID") as HTMLIonInputElement).value as string;
    let start = (document.getElementById("startID") as HTMLIonInputElement).value as string;
    //let end = (document.getElementById("endID") as HTMLIonInputElement).value;

    

    let id = props.match.params.id;
    let currentClub = clubs!.get(id);
    if (!currentClub) {
      throw new Error("Undefined club error with ID " + id);
    }

    currentClub.addEvent("id", desc, Date.toString(), "img", name.toString(), date, start, loc);
    clubs!.set(id, currentClub);
    
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