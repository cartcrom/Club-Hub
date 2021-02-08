
import React, { ReactElement, useState } from "react";
import { IonContent, IonLabel, IonSelect, IonPage, IonProgressBar, IonFooter, IonItem, IonSelectOption} from "@ionic/react";
import "./InterestQuiz.css";


//working auto complete
/*<input value={schoolname} className="drop-down-button" required={true} type="text" id="programming_language" list="languages" placeholder="School Name" />
<datalist id="languages">
{addOptions(schools)}
</datalist>*/

interface InterestQuizProps {
    nextPage(): void;
    updateSchoolInfo(s:string, c:string, m:string): void;
}

const addOptions = (fields: Array<string>) => {

	const tags: JSX.Element[] = [];
	fields.forEach(optionName => {
		tags.push(<IonSelectOption key={optionName} value={optionName}>{optionName}</IonSelectOption>);
	});
	return tags;

};

const InterestQuizPg1 = (props: InterestQuizProps) : ReactElement => {
	const [schoolname, setSchool] =  useState<string>("Undefined");
	const [college, setCollege] =  useState<string>("Undefined");
	const [major, setMajor] =  useState<string>("Undefined");
	const schools = ["Cal Poly SLO", "Cal Poly Pomona", "Davis"];
	const colleges = ["Engineering", "Science and Math", "Liberal Arts"];
	const majors = ["Software Engineering", "Computer Science", "Architectural Engineering"];

    let schoolOptions = []
    for (let i = 0; i < schools.length; i++){
        schoolOptions[i] = {name: schools[i], value: "school" + i.toString}
    }
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.1}></IonProgressBar>
                <h2 id="quiz-header">School Information </h2>
                <form>
                    <IonItem className="drop-down-button" >
                        <IonSelect value={schoolname} placeholder="School Name" className="center-elements" onIonChange={e => setSchool(e.detail.value)}> 
                        {addOptions(schools)}
                        </IonSelect>
                    </IonItem>
                    <IonItem className="drop-down-button">
                        <IonSelect value={college} placeholder="College" className="center-elements" onIonChange={e => setCollege(e.detail.value)}> 
                            {addOptions(colleges)}
                        </IonSelect>
                    </IonItem>
                    <IonItem className="drop-down-button">
                        <IonSelect value={major} placeholder="Major" className="center-elements" onIonChange={e => setMajor(e.detail.value)}> 
                            {addOptions(majors)}
                        </IonSelect>
                    </IonItem>
                </form>
            </IonContent>

			<IonFooter className="transparent">
				<IonItem button detail={false} className="white-outline-button" onClick={() => {props.updateSchoolInfo(schoolname, college, major); props.nextPage();}}>
					<IonLabel>next</IonLabel>
				</IonItem>
			</IonFooter>
		</IonPage>
	);
};
  
export default InterestQuizPg1;