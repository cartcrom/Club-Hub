import React, { ReactElement, SyntheticEvent, useState } from "react";
import { IonContent, IonLabel, IonSelect, IonPage, IonProgressBar, IonFooter, IonItem, IonSelectOption} from "@ionic/react";
import "./InterestQuiz.css";
import majorsArr from './listOfMajors';
import DataList from './DataList'
import { key } from "ionicons/icons";

interface InterestQuizProps {
    nextPage(): void;
    updateSchoolInfo( c:string, m:string): void;
}

const addOptions = (fields: Array<string>) => {
    const tags: JSX.Element[] = [];
    let i = 0;
	fields.forEach(optionName => {
        //tags.push(<IonSelectOption key={optionName} value={optionName}>{optionName}</IonSelectOption>);
        tags.push(<option key={optionName} value={optionName}>{optionName}</option>);
	});
	return tags;
};

const InterestQuizPg1 = (props: InterestQuizProps) : ReactElement => {
	const [college, setCollege] =  useState<string>("Undefined");
	const [major, setMajor] =  useState<string>("Undefined");
    const colleges = 
        ["Agriculture, Food, and Environmental Sciences", 
        "Architecture and Environmental Design", 
        "Business", "Engineering","Liberal Arts", "Science and Math"];
    const majors = majorsArr;

    const collegeItems = colleges.map(x => ({label: x, key: x}))
    const majorItems = majors.map(x => ({label: x, key: x}))
    
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.1}></IonProgressBar>
                <h2 id="quiz-header">School Information </h2>

                    <DataList
                        placeholder="College"
                        items={collegeItems}
                        onSelect={(e: {label: string, key: string}) => setCollege(e.label)}
                    />

                    <DataList
                        className="drop-down-button"
                        placeholder="Major"
                        items={majorItems}
                        onSelect={(e: {label: string, key: string}) => setMajor(e.label)}
                    />

            </IonContent>

			<IonFooter className="transparent">
				<IonItem button detail={false} className="white-outline-button" onClick={() => {props.updateSchoolInfo(college, major); props.nextPage();}}>
					<IonLabel>next</IonLabel>
				</IonItem>
			</IonFooter>
		</IonPage>
	);
};
  
export default InterestQuizPg1;