import React from 'react';
import { IonContent, IonChip, IonLabel, IonPage, IonGrid } from '@ionic/react';
import './FrontPage.css';
import logo from '../images/CHLogo.png'

const SignIn: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <img src={logo} alt="ClubHub Logo" id="logo" className="center"/>
                <span id="name" className="center">ClubHub</span>
                <IonChip class="center">
                    <IonLabel>Login</IonLabel>
                </IonChip>
            </IonContent>
        </IonPage>
    );
};
export default SignIn