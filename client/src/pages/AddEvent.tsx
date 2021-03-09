import React, { useContext, useState } from "react";
import API from "../services/api";
import { IonButton, IonButtons, IonBackButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonAlert } from "@ionic/react";
import { ClubContext } from "../ClubContext";
import { RouteComponentProps } from "react-router";
import "./AddEvent.css";
import Club from "../components/Club";

interface AddEventProps extends RouteComponentProps<{ id: string; }> {
  updateEvents: Function;
}

const AddEvent: React.FC<AddEventProps> = (props) => {
  const [showAlert1, setShowAlert1] = useState(false);

  const clubs: Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  const addEvent = () => {
    let name = (document.getElementById("nameID") as HTMLIonInputElement).value as string;
    const desc = (document.getElementById("descID") as HTMLIonInputElement).value as string;
    const loc = (document.getElementById("locID") as HTMLIonInputElement).value as string;
    const img = (document.getElementById("imageID") as HTMLIonInputElement).value as string;
    let date = "";
    if (document.getElementById("dateID") != null) {
      date = (document.getElementById("dateID") as HTMLIonInputElement).value as string;
    }
    let start = "";
    if (document.getElementById("startID") != null) {
      start = (document.getElementById("startID") as HTMLIonInputElement).value as string;
    }
    //let end = (document.getElementById("endID") as HTMLIonInputElement).value;

    if (name == "" || desc == "" || loc == "" || date == "") {
      setShowAlert1(true);
      return (
        <IonAlert
          isOpen={true}
          onDidDismiss={() => setShowAlert1(false)}
          header={"Must fill all fields."}
          message={"Please fill out each field for your event."}
          buttons={["OK"]}
        />);
    }

    const id = props.match.params.id;
    const currentClub = clubs!.get(id);
    if (!currentClub) {
      throw new Error("Undefined club error with ID " + id);
    }

    const now = new Date;
    name = name.toString();
    const eventDate = new Date(date).toDateString().slice(0, -5);
    const postDate = now.toString();

    API.pushNewEvent(id, name, desc, postDate, eventDate, start, loc, img, () => props.updateEvents(), (err: any) => console.log(err));
  };

  const max_year = (new Date().getFullYear() + 1).toString()

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass="my-custom-class"
        header={"Must fill all fields."}
        message={"Please fill out each field for your event."}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle>Event Adder</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text="" color="dark" />
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
          <IonLabel position="floating">Image URL</IonLabel>
          <IonInput type="url" id={"imageID"} required={true}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Date</IonLabel>
          <IonDatetime max={max_year} id={"dateID"}></IonDatetime>
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