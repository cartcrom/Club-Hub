import React from 'react';
import { IonContent, IonLabel, IonPage, IonFooter, IonToolbar, IonHeader, IonButtons, IonBackButton, IonInput, IonIcon, IonItem, IonButton, IonChip} from '@ionic/react';
import { alertCircleOutline, lockClosedOutline, mailOutline, personOutline} from 'ionicons/icons';
import './FrontPage.css';
import logo from '../../images/CHLogo.png'
import { RouteComponentProps } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface LoginProps extends RouteComponentProps {
    setLogin: Function
}

type SignUpInfo = {
    name: string;
    college: string | undefined;
    email: string;
    password: string;
}


const SignUp: React.FC<LoginProps> = (props) =>{

    const {control, handleSubmit, errors} = useForm<SignUpInfo>();

    const registerUser = (data: SignUpInfo) => {
        data.college = getCollege(data.email);
        console.log(data); /* TODO: Send data to backend */
        console.log("HERE");
        props.setLogin(true);
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
                <form onSubmit={handleSubmit(registerUser)} id="form">
                    <IonItem className="chip-input">
                        <IonIcon src={personOutline} slot="start" />
                        <Controller
                            name="name"
                            control={control}
                            render={({onChange, onBlur}) => (
                                <IonInput placeholder="full name" type="text" required
                                    onIonChange={onChange} onIonBlur={onBlur} />
                            )}
                        />
                    </IonItem>
                    <IonItem className="chip-input">
                        <IonIcon src={mailOutline} slot="start" />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /.*edu/,
                                    message: 'Email must end with .edu'
                                }
                            }}
                            render= {({onChange, onBlur}) => (
                                <IonInput placeholder="school email" type="email" required
                                    onIonChange={onChange} onIonBlur={onBlur}/>
                            )}
                        />
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render = { ({message}) =>
                            <div className="form-error">
                                <IonIcon src={alertCircleOutline} color="danger"/>
                                <IonLabel color="danger">{message}</IonLabel>
                            </div>
                        }
                    />
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
                    <IonButton type="submit" className="chip-button-outline">
                        <IonLabel>Create New Account</IonLabel>
                    </IonButton>
                    
                </form>
            </IonFooter>
        </IonPage>
    );
};
export default SignUp

let getCollege = (email : string): string | undefined => {
    let collegeEmails = new Map([
        ['calpoly', "California Polytechnic State University, San Luis Obispo"]
    ])
    let start = email.indexOf('@') + 1;
    let end = email.indexOf('.edu');
    let collegeFromEmail = email.slice(start, end);
    let college = collegeEmails.get(collegeFromEmail) ? collegeEmails.get(collegeFromEmail) : collegeFromEmail
    return college
}