import React, { useState } from 'react';
import { IonContent, IonLabel, IonSelect, IonPage, IonProgressBar, IonFooter, IonItem, IonIcon,IonInput, IonHeader, IonToolbar, IonButton, IonSelectOption, IonSelectPopover} from '@ionic/react';
import './InterestQuiz.css';
import InterestQuiz from './InterestQuiz';

//working auto complete
/*<input value={schoolname} className="drop-down-button" required={true} type="text" id="programming_language" list="languages" placeholder="School Name" />
<datalist id="languages">
{addOptions(schools)}
</datalist>*/

interface InterestQuizProps {
    nextPage: Function
    updateSchoolInfo: Function
}

const addOptions = (fields: Array<string>) => {
    let tags: JSX.Element[] = []
    fields.forEach(optionName => {
        tags.push(<IonSelectOption key={optionName} value={optionName}>{optionName}</IonSelectOption>)
        //tags.push(<option key={optionName} value={optionName}></option>)
    });
    return tags

}

const InterestQuizPg1 = (props: InterestQuizProps) => {
    const [schoolname, setSchool] =  useState<string>()
    const [college, setCollege] =  useState<string>()
    const [major, setMajor] =  useState<string>()
    let schools = ["Cal Poly SLO", "Cal Poly Pomona", "Davis"]
    let colleges = ["Engineering", "Science and Math", "Liberal Arts"]
    let majors = ["Software Engineering", "Computer Science", "Architectural Engineering"]

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
                <IonItem button detail={false} className="white-outline-button" onClick={() => {props.updateSchoolInfo(schoolname, college, major); props.nextPage()}}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
  };
  
  export default InterestQuizPg1;