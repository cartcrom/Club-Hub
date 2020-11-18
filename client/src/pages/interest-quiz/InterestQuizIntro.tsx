import React from 'react';
import './InterestQuiz.css'
import { IonContent, IonLabel, IonPage, IonFooter, IonItem, IonButtons, IonHeader, IonToolbar, IonButton} from '@ionic/react';

interface InterestQuizProps {
    nextPage: Function;
    skipQuiz: Function;
}

const InterestQuizIntro = (props: InterestQuizProps) => {
    //return(      
    //<IonItem lines="none" button onClick={() => props.history.push('addEvent')}></IonItem> 

    return (
        <IonPage>
            <IonContent fullscreen >
                <h2 id="title">Interest Quiz</h2>
                <p className="quiz-p">now let's take a short quiz to find the best clubs for you</p>
                <IonItem button detail={false} className="gradient-button" onClick={() => props.nextPage()}>
                    <IonLabel>let's go!</IonLabel>
                </IonItem>
                <IonItem button detail={false} className="outline-button" onClick={() => props.skipQuiz()}>
                    <IonLabel>skip</IonLabel>
                </IonItem>
               
            </IonContent>
        </IonPage>
    );
  };
  
  export default InterestQuizIntro;
