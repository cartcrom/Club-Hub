import { IonButton, IonButtons, IonBackButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ClubContext } from '../ClubContext';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import React, { useRef, useContext} from 'react';
import { RouteComponentProps } from 'react-router';
import './AddEvent.css';
import Club from '../components/Club';
import Event from '../components/Event';
import { wait } from '@testing-library/react';
import axios from 'axios';

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


    /*Date d = new Date();
    String s = d.toString;
    Date theSameDate = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy").parse(s);*/
    let now = new Date
    currentClub.addEvent("id", desc, now , "https://placeimg.com/640/640/nature", name.toString(), now.toString() , start, loc);

    
    clubs!.set(id, currentClub);

    //make a post call here to send the data to the server
    name = name.toString();
    let eventDate = new Date(date).toDateString().slice(0, -5);
    let postDate = now.toString();
    let image = "https://placeimg.com/640/640/nature";
    const backendEventStructure = {
      id,
      name,
      desc,
      postDate,
      eventDate,
      start,
      loc,
      image,
    }
    
    axios.post('http://localhost:5000/add/event', backendEventStructure)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    props.history.goBack();
  }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar className="header">
              <IonTitle>Event Adder</IonTitle>
              <IonButtons slot="start">
                <IonBackButton text="" color="dark"/>
              </IonButtons>
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