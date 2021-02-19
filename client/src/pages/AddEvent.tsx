import { IonButton, IonButtons, IonBackButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ClubContext } from '../ClubContext';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import React, { useRef, useContext} from 'react';
import { RouteComponentProps } from 'react-router';
import './AddEvent.css';
import Club from '../components/Club';
import Event from '../components/Event';
import { wait } from '@testing-library/react';

interface AddEventProps extends RouteComponentProps<{id : string}> {
  saveEvent: Function;
}

const AddEvent: React.FC<AddEventProps> = (props) => {

  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
    if (clubs === undefined) {
      throw new Error("Undefined clubs error");
    }

    function timeSince(date : Date) {

      var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
      var interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }
    var aDay = 24*60*60*1000;
    console.log(timeSince(new Date(Date.now()-aDay)));
    console.log(timeSince(new Date(Date.now()-aDay*2)));

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

    function sleep(milliseconds : Number) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }

    /*Date d = new Date();
    String s = d.toString;
    Date theSameDate = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy").parse(s);*/
    let now = new Date
    sleep(5000);
    currentClub.addEvent("id", desc, timeSince(now) , "img", name.toString(),timeSince(now) , start, loc);

    
    clubs!.set(id, currentClub);

    props.history.goBack();

    
    //make a post call here to send the data to the server
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