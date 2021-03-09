import React from "react";
import { IonContent, IonFooter, IonProgressBar, IonPage, IonList, IonLabel, IonItem, IonCheckbox } from "@ionic/react";
import "./InterestQuiz.css";


interface InterestQuizProps {
  nextPage: Function
  addInterest: Function
}

const InterestQuizPg2 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Business", val: "Business" },
      { title: "Community Service", val: "Service" },
      { title: "Greek Life", val: "Greek Life" },
      { title: "History, Law, and Politics", val: "History" },
      { title: "Language and Culture", val: "Culture" },
      { title: "Nature and Agriculture", val: "Nature" }];


  return (
    <IonPage>
      <IonContent fullscreen className="quiz-gradient" >
        <IonProgressBar className="progress-bar" color="secondary" value={0.3}></IonProgressBar>
        <h2 id="quiz-header">I am Interested In:</h2>
        <IonList className="transparent">
          {checkboxes.map(({ title, val }, i) => (
            <IonItem className="checkbox-box" key={i}>
              <IonLabel>{title}</IonLabel>
              <IonCheckbox className="checkbox" slot="start" value={val} onIonChange={e => props.addInterest(e.detail.value, e.detail.checked)} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter className="transparent">
        <IonItem button detail={false} lines="none" className="white-outline-button" onClick={() => props.nextPage()}>
          <IonLabel>next</IonLabel>
        </IonItem>
      </IonFooter>

    </IonPage>
  );
};

export default InterestQuizPg2;