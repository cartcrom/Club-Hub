import React, { useState } from 'react';
import { IonAvatar, IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType} from '@capacitor/core';
import './ClubRegistration.css'

const ClubRegistration: React.FC<RouteComponentProps> = (props) => {

  const {Camera} = Plugins;
  const [profile, setProfile] = useState<string | undefined>(require('../../images/avatar.svg'));
  const [profileUploaded, setProfileUploaded] = useState<boolean>(false);
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    setProfile(image.webPath);
    setProfileUploaded(true)
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register your Club!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonItemGroup>
          <div className="center vertical" id="profile-holder">
            <IonAvatar id="profile">
              <img src={profile} />
            </IonAvatar>
            <IonButton fill="clear" onClick={() => takePhoto()}>{profileUploaded ? 'Change' : 'Upload'}</IonButton>
          </div>
          <IonItemDivider>
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
        </IonItemGroup>

        <IonItemGroup>
          <IonItemDivider>
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
          <IonItemDivider>
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
