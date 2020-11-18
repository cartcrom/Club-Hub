import React from 'react';
import { IonContent, IonItem, IonLabel, IonButton, IonNote, IonList, IonGrid, IonRow, IonCol, IonChip, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { RouteComponentProps } from 'react-router';
import Student from '../components/Student';
import './UserSettings.css';

let test_student = new Student("Carter", "Cromer", 1, "Cal Poly SLO", "ccromer@calpoly.edu", ["social", "recreation", "outdoors", "athletic", "games"]);


const UserSettings: React.FC<RouteComponentProps> = (props) => {
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
              <IonNote slot="end" color="black">{test_student.fn}</IonNote>
            </IonItem>
            <IonItem lines="none" className="data" >
              <IonLabel>Last Name</IonLabel>
              <IonNote slot="end" color="black">{test_student.ln}</IonNote>
            </IonItem>
            <IonItem lines="none" className="data" >
              <IonLabel>Email Address</IonLabel>
              <IonNote slot="end" color="black">{test_student.email}</IonNote>
            </IonItem>
            <IonItem lines="none" className="data" >
              <IonLabel>School</IonLabel>
              <IonNote slot="end" color="black">{test_student.school}</IonNote>
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
          <IonItem lines="none" className="tags" >
            <IonChip className="tag">Recreational</IonChip>
            <IonChip  className="tag">Food</IonChip>
            <IonChip className="tag">Poppin'</IonChip>
          </IonItem>
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