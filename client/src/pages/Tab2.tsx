import React from 'react';
import { IonButton, IonCheckbox, IonChip, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonRadio, IonRadioGroup, IonSegment, IonSegmentButton, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemGroup>
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
          <IonItem>
            <IonButton fill="clear">+Add Profile Picture</IonButton>
          </IonItem>
        </IonItemGroup>

        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Meetings</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonButton shape="round">S</IonButton>
            <IonButton shape="round">M</IonButton>
            <IonButton shape="round">T</IonButton>
            <IonButton shape="round">W</IonButton>
            <IonButton shape="round">R</IonButton>
            <IonButton shape="round">F</IonButton>
            <IonButton shape="round">S</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Start</IonLabel>
            <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>End</IonLabel>
            <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="13:00"></IonDatetime>
          </IonItem>
          <IonSegment color="medium">
            <IonSegmentButton>
              <IonLabel>In Person</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton>
              <IonLabel>Virtual</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonItem>
            <IonLabel position="floating">Meeting Location</IonLabel>
          </IonItem>
        </IonItemGroup>

        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Affiliations</IonLabel>
          </IonItemDivider>
          <IonItem href="https://www.ionicframework.com">
            <IonLabel>Type</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Academic</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Community Service</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Cultural</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Entertainment</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Environmental</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Performing Arts</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Political</IonLabel>
          </IonItem>
          <IonItem>
           <IonCheckbox></IonCheckbox>
            <IonLabel>Professional</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Religious</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>Special Interest</IonLabel>
          </IonItem>

          <IonItem href="https://www.ionicframework.com">
            <IonLabel>Colleges</IonLabel>
          </IonItem>
          <IonRadioGroup>
            <IonItem>
              <IonRadio/>
              <IonLabel>CAED</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio/>
              <IonLabel>CAFES</IonLabel>
            </IonItem>
            <IonItem>
             <IonRadio/>
              <IonLabel>CENG</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio/>
              <IonLabel>CLA</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio/>
              <IonLabel>COB</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio/>
              <IonLabel>COSAM</IonLabel>
            </IonItem>
          </IonRadioGroup>
        </IonItemGroup>

        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>More Info</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonIcon name="logo-facebook"></IonIcon>
            <IonLabel>Facebook</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon name="logo-instagram"></IonIcon>
            <IonLabel>Instagram</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon name="globe-outline"></IonIcon>
            <IonLabel>Personal Website</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon name="mail-outline"></IonIcon>
            <IonLabel>Mailing List</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon name="help-outline"></IonIcon>
            <IonLabel>Other</IonLabel>
            <IonInput></IonInput>
          </IonItem>
        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
