import React from "react";
import { IonContent, IonProgressBar, IonPage, IonList, IonLabel, IonItem, IonCheckbox } from "@ionic/react";
import "./InterestQuiz.css";

interface InterestQuizProps {
  nextPage: Function
  addInterest: Function
}

const InterestQuizPg3 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Performance + Arts", val: "performingArts" },
      { title: "Publications + Media", val: "publicationsMedia" },
      { title: "Service + Social Justice", val: "serviceSocialJustice" },
      { title: "Sports", val: "sports" },
      { title: "STEM", val: "stem" },
      { title: "Sustainability + Wellness", val: "sustainability" }];


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

        <IonItem button detail={false} className="white-outline-button" onClick={() => props.nextPage()}>
          <IonLabel>next</IonLabel>
        </IonItem>
      </IonContent>

    </IonPage>
  );
};

export default InterestQuizPg3;