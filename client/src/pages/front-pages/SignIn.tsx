import React from 'react';
import { IonContent, IonLabel, IonPage, IonFooter, IonToolbar, IonHeader, IonButtons, IonBackButton, IonInput, IonIcon, IonItem, IonButton} from '@ionic/react';
import { alertCircleOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface LoginProps extends RouteComponentProps {
    setLogin: Function,
    setUser: Function
}

type LoginInfo = {
    email: string;
    password: string;
}

const SignIn: React.FC<LoginProps> = (props) => {
    const {control, handleSubmit, setError, errors} = useForm<LoginInfo>();
    const axios = require('axios').default;

    const logIn = async (info: LoginInfo) => {
        try {
            const res = await axios.post('http://localhost:5000/login', info);
            console.log(res.data);
            props.setUser(res.data);
            props.setLogin(true);
        } catch (err) {
            console.log(err.response.data);
            setError("password", {message: err.response.data});
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="transparent">
                    <IonButtons slot="start">
                        <IonBackButton text="" className="white-color"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="gradient-content" scrollY={false}>
                <img src={logo} alt="ClubHub Logo" id="logo"/>
                <p id="name">ClubHub</p>
            </IonContent>

            <IonFooter className="transparent">
                <form onSubmit={handleSubmit(logIn)}>
                    <IonItem className="chip-input">
                        <IonIcon src={personOutline} slot="start"></IonIcon>
                        <Controller 
                            name="email"
                            control={control}
                            render={({onChange, onBlur}) => (
                                <IonInput placeholder="email address" type="email"
                                    onIonChange={onChange} onIonBlur={onBlur}/>
                            )}
                        />
                    </IonItem>
                    <IonItem className="chip-input">
                        <IonIcon src={lockClosedOutline} slot="start"></IonIcon>
                        <Controller 
                            name="password"
                            control={control}
                            render= {({onChange, onBlur}) => (
                                <IonInput placeholder="password" type="password" 
                                    onIonChange={onChange} onIonBlur={onBlur}/>
                            )}
                        />
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render = { ({message}) =>
                            <div className="form-error">
                                <IonIcon src={alertCircleOutline} color="danger"/>
                                <IonLabel color="danger">{message}</IonLabel>
                            </div>
                        }
                    />

                    <IonItem detail={false} class="center-elements transparent" id="forgot-password" href="https://support.google.com/accounts/answer/41078?co=GENIE.Platform%3DDesktop&hl=en">
                        <IonLabel>Forgot password?</IonLabel>
                    </IonItem>
                    <div className="center">
                        <IonButton type="submit" className="chip-button" id="form-button">
                            Log In
                        </IonButton>
                    </div>
                </form>

            </IonFooter>
        </IonPage>
    );
};
export default SignIn