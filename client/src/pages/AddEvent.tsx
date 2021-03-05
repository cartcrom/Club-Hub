import React, { useRef, useContext, useState} from 'react';
import API from '../services/api'
import { IonButton, IonButtons, IonBackButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import { ClubContext } from '../ClubContext';
import { RouteComponentProps } from 'react-router';
import './AddEvent.css';
import Club from '../components/Club';

interface AddEventProps extends RouteComponentProps<{id : string}> {
  saveEvent: Function;
}

const AddEvent: React.FC<AddEventProps> = (props) => {
  const [showAlert1, setShowAlert1] = useState(false);

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

    if(name == "" || desc == "" || loc == "" || date == ""){
      setShowAlert1(true)
      return(
        <IonAlert
        isOpen={true}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass='my-custom-class'
        header={'Must fill all fields.'}
        message={'Please fill out each field for your event.'}
        buttons={['OK']}
      />)
    }

    

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

    name = name.toString();
    let eventDate = new Date(date).toDateString().slice(0, -5);
    let postDate = now.toString();
    let image = "https://placeimg.com/640/640/nature";
    
    API.pushNewEvent(id, name, desc, postDate, eventDate, start, loc, image, () => props.history.goBack(), (err : any) => console.log(err))
  }

    return (
        <IonPage>
          <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Must fill all fields.'}
          message={'Please fill out each field for your event.'}
          buttons={['OK']}
        />
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
                <IonInput id={"nameID"} ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonInput id={"descID"}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Location</IonLabel>
                <IonInput id={"locID"} minlength={1} required={true}></IonInput>
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
                <IonButton onClick={() => addEvent()} expand="block" id="add-button">Add Event</IonButton>
                <IonButton expand="full" onClick={() => props.history.goBack()}>Cancel</IonButton>
          </IonContent>
        </IonPage>
    );
};

export default AddEvent;