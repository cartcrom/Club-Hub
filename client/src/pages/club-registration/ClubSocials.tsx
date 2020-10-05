import React from 'react'
import {IonPage, IonToolbar, IonHeader, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonIcon, IonLabel, IonInput} from '@ionic/react'
import {globeOutline, helpOutline, logoFacebook, logoInstagram, mailOutline} from 'ionicons/icons';

const ClubSocials: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Social Media & More</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonItem>
                    <IonIcon icon={logoFacebook} slot="start"></IonIcon>
                    <IonLabel>Facebook</IonLabel>
                    <IonInput></IonInput>
                </IonItem>
                <IonItem>
                    <IonIcon icon={logoInstagram} slot="start"></IonIcon>
                    <IonLabel>Instagram</IonLabel>
                    <IonInput></IonInput>
                </IonItem>
                <IonItem>
                    <IonIcon icon={globeOutline} slot="start"></IonIcon>
                    <IonLabel>Personal Website</IonLabel>
                    <IonInput></IonInput>
                </IonItem>
                <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>Mailing List</IonLabel>
                    <IonInput></IonInput>
                </IonItem>
                <IonItem>
                    <IonIcon icon={helpOutline} slot="start"></IonIcon>
                    <IonLabel>Other</IonLabel>
                    <IonInput></IonInput>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};
export default ClubSocials