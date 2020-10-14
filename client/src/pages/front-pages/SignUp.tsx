import React from 'react';
import { IonContent, IonLabel, IonPage, IonFooter, IonToolbar, IonHeader, IonButtons, IonBackButton, IonInput, IonIcon, IonItem} from '@ionic/react';
import { checkmarkCircleOutline, lockClosedOutline, personOutline, schoolOutline } from 'ionicons/icons';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';

interface LoginProps extends RouteComponentProps {
    setLogin: Function
}

const SignUp: React.FC<LoginProps> = (props) =>{
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
                <IonItem className="chip-input">
                    <IonIcon src={checkmarkCircleOutline} slot="start"></IonIcon>
                    <IonInput placeholder="retype password"></IonInput>
                </IonItem>
                <IonItem className="chip-input">
                    <IonIcon src={schoolOutline} slot="start"></IonIcon>
                    <IonInput placeholder="School"></IonInput>
                </IonItem>

                <IonItem button detail={false} className="chip-button bottom-button" onClick={() => {props.setLogin(true);}}>
                    <IonLabel>Create New Acount</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default SignUp