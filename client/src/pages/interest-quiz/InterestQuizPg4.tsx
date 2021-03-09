import React from "react";
import { IonContent, IonFooter, IonProgressBar, IonPage, IonList, IonLabel, IonItem, IonCheckbox } from "@ionic/react";
import "./InterestQuiz.css";

interface InterestQuizProps {
  nextPage: Function
  addInterest: Function
}

const InterestQuizPg4 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Social", val: "Social" },
      { title: "Professional", val: "Professional" },
      { title: "Project Based", val: "Project" },
      { title: "Competition Based", val: "Competitive" },
      { title: "Religious", val: "Religious" }];

  return (
    <IonPage>
      <IonContent fullscreen className="quiz-gradient" >
        <IonProgressBar className="progress-bar" color="secondary" value={0.8}></IonProgressBar>
        <h2 id="quiz-header">I am Looking For:</h2>
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
        <IonItem button detail={false} lines="none" className="submit-button" onClick={() => props.nextPage()}>
          <IonLabel>submit</IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default InterestQuizPg4;