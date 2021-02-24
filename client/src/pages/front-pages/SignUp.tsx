import React from 'react';
import axios from 'axios';
import { backend_URL } from '../../constants'
import { IonContent, IonLabel, IonPage, IonFooter, IonInput, IonIcon, IonItem, IonButton} from '@ionic/react';
import { alertCircleOutline, lockClosedOutline, mailOutline, personOutline} from 'ionicons/icons';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface LoginProps extends RouteComponentProps {
    authenticate: Function
}

type SignUpInfo = {
    firstName: string;
    lastName: string;
    college: string | undefined;
    email: string;
    password: string;
}


const SignUp: React.FC<LoginProps> = (props) =>{
    const {control, handleSubmit, setError, errors} = useForm<SignUpInfo>();


    const registerUser = async (info: SignUpInfo) => {
        console.log('submitting')

        axios.post(backend_URL + '/SignUp', info)
            .then((res : any) => {
            // handle success
            console.log(res);
            props.authenticate(res.data);   // Add user response from server here later
          })
          .catch((err : any) => {
            if (!err.response) {
                // network error
                alert("Network Connection Error");
            } else {
                console.log(err);
                setError("password", {message: err.response.data});
            }
          })
          .then(function () {
            // always executed
          });
    }

    return (
        <IonPage>

            <IonContent fullscreen className="gradient-content" scrollY={false}>
                <img src={logo} alt="ClubHub Logo" id="logo"/>
                <p id="name">ClubHub</p>
            </IonContent>

            <IonFooter className="transparent">
                <form onSubmit={handleSubmit(registerUser)} id="form">
                    <IonItem className="chip-input">
                        <IonIcon src={personOutline} slot="start" />
                        <Controller
                            name="firstName"
                            control={control}
                            render={({onChange, onBlur}) => (
                                <IonInput placeholder="first name" type="text" required
                                    onIonChange={onChange} onIonBlur={onBlur} />
                            )}
                        />
                    </IonItem>
                    <IonItem className="chip-input">
                        <IonIcon src={personOutline} slot="start" />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({onChange, onBlur}) => (
                                <IonInput placeholder="last name" type="text" required
                                    onIonChange={onChange} onIonBlur={onBlur} />
                            )}
                        />
                    </IonItem>
                    <IonItem className="chip-input">
                        <IonIcon src={mailOutline} slot="start" />
                        <Controller
                            name="email"
                            control={control}
                            render= {({onChange, onBlur}) => (
                                <IonInput placeholder="school email" type="email" required
                                    onIonChange={onChange} onIonBlur={onBlur}/>
                            )}
                        />
                    </IonItem>
                    <IonItem className="chip-input">
                        <IonIcon src={lockClosedOutline} slot="start" />
                        <Controller
                            name="password"
                            control={control}
                            render= {({onChange, onBlur}) => (
                                <IonInput placeholder="password" type="password" enterkeyhint="done" required
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
export default SignUp