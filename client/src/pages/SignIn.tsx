import React from 'react';
import { IonContent, IonChip, IonLabel, IonPage, IonFooter, IonToolbar, IonTitle, IonHeader, IonButtons, IonBackButton, IonInput, IonIcon, IonItem} from '@ionic/react';
import { chevronBackOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import './FrontPage.css';
import logo from '../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';

const SignIn: React.FC<RouteComponentProps> = (props) =>{
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="transparent">
                    <IonButtons slot="start">
                        <IonBackButton text="" className="white-color"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="gradient-content">
                <img src={logo} alt="ClubHub Logo" id="logo"/>
                <p id="name">ClubHub</p>
            </IonContent>

            <IonFooter className="centerElements transparent">
                <IonItem className="chip-input">
                    <IonIcon src={personOutline} slot="start"></IonIcon>
                    <IonInput placeholder="email address"></IonInput>
                </IonItem>
                <IonItem className="chip-input">
                    <IonIcon src={lockClosedOutline} slot="start"></IonIcon>
                    <IonInput placeholder="password"></IonInput>
                </IonItem>

                <hr />

                <IonItem button className="chip-button" onClick={() => props.history.push('tab2')}>
                    <IonLabel>Login</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default SignIn