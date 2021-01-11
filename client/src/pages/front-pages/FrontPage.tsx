import React from 'react';
import { IonContent, IonLabel, IonPage, IonFooter, IonItem} from '@ionic/react';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';

interface LoginProps extends RouteComponentProps {
    setLogin: Function
}

const FrontPage: React.FC<LoginProps> = (props) => {
    return (
        <IonPage>
            <IonContent fullscreen className="gradient-content">
                <img src={logo} alt="ClubHub Logo" id="logo"/>
                <p id="name">ClubHub</p>
            </IonContent>

            <IonFooter className="transparent">

                <IonItem button title="signUpButton" detail={false} className="chip-button-outline" onClick={() => props.history.push('signup')}>
                    <IonLabel>I'm a new user</IonLabel>
                </IonItem>

                <IonItem button title="signInButton" detail={false} className="chip-button" onClick={() => props.history.push('signin')}>
                    <IonLabel>I have an account</IonLabel>
                </IonItem>

                <hr/>

                <IonItem button detail={false} className="chip-button-outline" onClick={() => {props.setLogin(true);}}>
                    <IonLabel>Continue as guest</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default FrontPage