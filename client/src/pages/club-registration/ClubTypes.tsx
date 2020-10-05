import React from 'react'
import {IonContent, IonHeader, IonPage, IonItem, IonCheckbox, IonLabel, IonToolbar, IonTitle, IonButtons, IonBackButton} from '@ionic/react'

const ClubTypes: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Club Type</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Academic</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Community Service</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Cultural</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Entertainment</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Environmental</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Performing Arts</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Political</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Professional</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Religious</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Special Interest</IonLabel>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};
export default ClubTypes
