import React from 'react';
import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

const ClubRegistration: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register your Club!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonItemGroup>
          <IonItemDivider color="medium">
            <IonLabel>General Info</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea></IonTextarea>
          </IonItem>
          <IonItem detail button>
            <IonLabel>Add Profile Picture</IonLabel>
          </IonItem>
        </IonItemGroup>

        <IonItemGroup>
          <IonItemDivider color="medium">
            <IonLabel>Meetings</IonLabel>
          </IonItemDivider>
          <IonItem detail button onClick={() => props.history.push('daysOfWeek')}>
            <IonLabel>Day Of Week</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Start</IonLabel>
            <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>End</IonLabel>
            <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="13:00"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Meeting Location</IonLabel>
            <IonInput></IonInput>
          </IonItem>
        </IonItemGroup>



        <IonItemGroup>
          <IonItemDivider color="medium">
            <IonLabel>More Info</IonLabel>
          </IonItemDivider>

          <IonItem detail button onClick={() => props.history.push('clubTypes')}>
            <IonLabel>Type</IonLabel>
          </IonItem>

          <IonItem detail button onClick={() => props.history.push('clubColleges')}>
            <IonLabel>Colleges</IonLabel>
          </IonItem>

          <IonItem detail button onClick={() => props.history.push('clubSocials')}>
            <IonLabel>Social Media & More</IonLabel>
          </IonItem>
          
        </IonItemGroup>
        <IonButton expand="full" size="large" onClick={() => props.history.push('tab2')}>Done!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ClubRegistration;
