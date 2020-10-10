import React from 'react';
import { IonContent, IonLabel, IonPage, IonFooter, IonItem} from '@ionic/react';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';

const FrontPage: React.FC<RouteComponentProps> = (props) =>{
    return (
        <IonPage>
            <IonContent fullscreen className="gradient-content">
                <img src={logo} alt="ClubHub Logo" id="logo"/>
                <p id="name">ClubHub</p>
            </IonContent>

            <IonFooter className="transparent">

                <IonItem button detail={false} className="chip-button-outline" onClick={() => props.history.push('signUp')}>
                    <IonLabel>I'm a new user</IonLabel>
                </IonItem>

                <IonItem button detail={false} className="chip-button" onClick={() => props.history.push('signIn')}>
                    <IonLabel>Login</IonLabel>
                </IonItem>

                <hr/>

                <IonItem button detail={false} className="chip-button-outline" onClick={() => props.history.push('tab2')}>
                    <IonLabel>Continue as guest</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};
export default FrontPage