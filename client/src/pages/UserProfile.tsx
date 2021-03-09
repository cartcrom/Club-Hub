import React, { useContext } from "react";
import { IonContent, IonItem, IonLabel, IonButton, IonNote, IonList, IonChip, IonCard, IonCardContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import Student from "../components/Student";
import "./UserSettings.css";
import { UserContext } from "../UserContext";

interface SettingsProps extends RouteComponentProps {
  logOut: Function;
}

const UserSettings: React.FC<SettingsProps> = (props) => {
  const user: Student | undefined = useContext(UserContext);
  if (user === undefined) {
    throw new Error("Undefined user error");
  }

  const interests = user.interests.map(interest => <IonChip key={interest} className="tag">{interest}</IonChip>);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonItem lines="none">
          <IonLabel className="settings-label">
            {"My Info"}
          </IonLabel>
        </IonItem>

        <IonCard>

          <IonCardContent className="settings-card">
            <IonList>
              <IonItem lines="none" className="data" >
                <IonLabel>First Name</IonLabel>
                <IonNote slot="end" color="black">{user.fn}</IonNote>
              </IonItem>
              <IonItem lines="none" className="data" >
                <IonLabel>Last Name</IonLabel>
                <IonNote slot="end" color="black">{user.ln}</IonNote>
              </IonItem>
              <IonItem lines="none" className="data" >
                <IonLabel>Email Address</IonLabel>
                <IonNote slot="end" color="black">{user.email}</IonNote>
              </IonItem>
              <IonItem lines="none" className="data" >
                <IonLabel>School</IonLabel>
                <IonNote slot="end" color="black">{user.school}</IonNote>
              </IonItem>
            </IonList>
            <IonItem lines="none" className="data" >
              <IonButton onClick={() => props.logOut()}>
                {(user.fn == "Guest") ? "sign up" : "log out"}
              </IonButton>
            </IonItem>

          </IonCardContent>

        </IonCard>

        <div className="divider" />

        <IonItem lines="none">
          <IonLabel className="clubs-label">
            {"My Interests"}
          </IonLabel>
        </IonItem>

        <IonCard>
          <IonCardContent className="settings-card">
            {interests}
            <IonItem lines="none" className="data" >
              <IonButton onClick={() => props.history.push("/interestQuiz")}>{(user.interests.length != 0) ? "retake interest quiz" : "take interest quiz"}</IonButton>
            </IonItem>
          </IonCardContent>

        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default UserSettings;