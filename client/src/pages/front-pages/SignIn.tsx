import React from 'react';
import { IonContent, IonLabel, IonPage, IonFooter, IonToolbar, IonHeader, IonButtons, IonBackButton, IonInput, IonIcon, IonItem} from '@ionic/react';
import { lockClosedOutline, personOutline } from 'ionicons/icons';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
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

            <IonFooter className="transparent">
                <IonItem className="chip-input">
                    <IonIcon src={personOutline} slot="start"></IonIcon>
                    <IonInput placeholder="email address"></IonInput>
                </IonItem>
                <IonItem className="chip-input">
                    <IonIcon src={lockClosedOutline} slot="start"></IonIcon>
                    <IonInput placeholder="password"></IonInput>
                </IonItem>

                <IonItem detail={false} class="center-elements transparent" id="forgot-password" href="https://support.google.com/accounts/answer/41078?co=GENIE.Platform%3DDesktop&hl=en">
                    <IonLabel>Forgot password?</IonLabel>
                </IonItem>

                <IonItem button detail={false} className="chip-button bottom-button" onClick={() => props.history.push('tab2')}>
                    <IonLabel>Login</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default SignIn