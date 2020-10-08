import React from 'react';
import { IonContent, IonChip, IonLabel, IonPage, IonFooter, IonToolbar, IonTitle, IonHeader, IonButtons, IonBackButton, IonInput, IonIcon, IonItem} from '@ionic/react';
import { chevronBackOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import './FrontPage.css';
import logo from '../images/CHLogo.png'

const SignIn: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text=""/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <img src={logo} alt="ClubHub Logo" id="logo"/>
                <p id="name">ClubHub</p>
            </IonContent>

            <IonFooter>
                <IonItem className="chip-input">
                    <IonIcon src={personOutline} slot="start"></IonIcon>
                    <IonInput placeholder="email address"></IonInput>
                </IonItem>
                <IonItem className="chip-input">
                    <IonIcon src={lockClosedOutline} slot="start"></IonIcon>
                    <IonInput placeholder="password"></IonInput>
                </IonItem>

                <hr />

                <IonItem className="chip-button">
                    <IonLabel>Login</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default SignIn