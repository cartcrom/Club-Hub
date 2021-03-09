import React from "react";
import "./InterestQuiz.css";
import { IonContent, IonFooter, IonLabel, IonPage, IonItem} from "@ionic/react";
import interests_graphic from '../../images/interests_graphic.png'

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
        <p id="title">Interest Quiz</p>
        <p className="quiz-p">A short quiz to find clubs you'd like!</p>
        <img src={interests_graphic} className={"interests-graphic"}/>

      </IonContent>
      <IonFooter>
        <IonItem button lines="none" detail={false} className="gradient-button" onClick={() => props.nextPage()}>
          <IonLabel>let's go!</IonLabel>
        </IonItem>
        <IonItem button lines="none" title="skipButton" detail={false} className="outline-button" onClick={() => props.skipQuiz()}>
          <IonLabel>skip</IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default InterestQuizIntro;
