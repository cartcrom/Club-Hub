import React, { useContext } from 'react';
import { IonContent, IonItem, IonLabel, IonButton, IonNote, IonList, IonChip, IonCard, IonCardContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Student from '../components/Student';
import './UserSettings.css';
import { UserContext } from '../UserContext';


const UserSettings: React.FC<RouteComponentProps> = (props) => {
  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  } 

  let interests = user.interests.map(intrest => <IonChip className="tag">{intrest}</IonChip>)

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
            <IonItem lines="none" className="data" >
              <IonButton>edit my info</IonButton>
            </IonItem>
          </IonList>
            

        </IonCardContent>
        
      </IonCard>

      <div className="divider"/>

      <IonItem lines="none">
        <IonLabel className="clubs-label">
          {"My Interests"}
        </IonLabel>
      </IonItem>

      <IonCard>
        <IonCardContent className="settings-card">
          {interests}
          <IonItem lines="none" className="data" >
            <IonButton onClick={() => props.history.push("/interestQuiz")}>retake interest quiz</IonButton>
          </IonItem>
        </IonCardContent>

</IonCard>

    </IonContent>
  </IonPage>
  );
};

export default UserSettings;
