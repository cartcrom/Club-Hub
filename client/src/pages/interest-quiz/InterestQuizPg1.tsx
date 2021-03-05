import React, { ReactElement, useState } from "react";
import { IonContent, IonLabel, IonPage, IonProgressBar, IonFooter, IonItem } from "@ionic/react";
import "./InterestQuiz.css";
import majorsArr from "./listOfMajors";
import DataList from "./DataList";

interface InterestQuizProps {
  nextPage: Function;
  updateSchoolInfo: Function;
}

const InterestQuizPg1 = (props: InterestQuizProps): ReactElement => {
  const [college, setCollege] = useState<string>("Undefined");
  const [major, setMajor] = useState<string>("Undefined");
  const colleges =
    ["Agriculture, Food, and Environmental Sciences",
      "Architecture and Environmental Design",
      "Business", "Engineering", "Liberal Arts", "Science and Math"];
  const majors = majorsArr;

  const collegeItems = colleges.map(x => ({ label: x, key: x }));
  const majorItems = majors.map(x => ({ label: x, key: x }));

  return (
    <IonPage>
      <IonContent fullscreen className="quiz-gradient" >
        <IonProgressBar className="progress-bar" color="secondary" value={0.1}></IonProgressBar>
        <h2 id="quiz-header">School Information </h2>

        <DataList
          placeholder="College"
          items={collegeItems}
          onSelect={(e: { label: string, key: string }) => setCollege(e.label)}
        />

        <DataList
          className="drop-down-button"
          placeholder="Major"
          items={majorItems}
          onSelect={(e: { label: string, key: string }) => setMajor(e.label)}
        />

      </IonContent>

      <IonFooter className="transparent">
        <IonItem button detail={false} className="white-outline-button" onClick={() => { props.updateSchoolInfo(college, major); props.nextPage(); }}>
          <IonLabel>next</IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default InterestQuizPg1;