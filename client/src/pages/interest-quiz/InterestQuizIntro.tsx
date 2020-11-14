import React from 'react';
import './InterestQuiz.css'
import { IonContent, IonLabel, IonPage, IonFooter, IonItem, IonButtons, IonHeader, IonToolbar, IonButton} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

const InterestQuizIntro = (props: RouteComponentProps) => {
    //return(      
    //<IonItem lines="none" button onClick={() => props.history.push('addEvent')}></IonItem> 

    return (
        <IonPage>
            <IonContent fullscreen >
                <h2 id="title">Interest Quiz</h2>
                <p>now let's take a short quiz to find the best clubs for you</p>
                <IonItem button detail={false} className="gradient-button" onClick={() => props.history.push('interestQuizPg1')}>
                    <IonLabel>let's go!</IonLabel>
                </IonItem>
                <IonItem button detail={false} className="outline-button" onClick={() => props.history.push('/feed')}>
                    <IonLabel>skip</IonLabel>
                </IonItem>
               
            </IonContent>
        </IonPage>
    );
  };
  
  export default InterestQuizIntro;
