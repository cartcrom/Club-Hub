import React from 'react';

import { IonContent, IonLabel, IonSelect, IonPage, IonProgressBar, IonFooter, IonItem, IonIcon,IonInput, IonHeader, IonToolbar, IonButton, IonSelectOption} from '@ionic/react';
import './InterestQuiz.css'
import { RouteComponentProps } from 'react-router';


const InterestQuizPg1 = (props: RouteComponentProps) => {
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.1}></IonProgressBar>
                <h2 id="quiz-header">School Information </h2>
                
                <IonItem className="drop-down-button">
                    <IonSelect placeholder="School Name" className="center-elements"> 
                        <IonSelectOption>Cal Poly SLO</IonSelectOption>
                        <IonSelectOption>Cal Poly Pomona</IonSelectOption>
                        <IonSelectOption>Davis</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem className="drop-down-button">
                    <IonSelect placeholder="College" className="center-elements"> 
                        <IonSelectOption>Engineering</IonSelectOption>
                        <IonSelectOption>Science and Math</IonSelectOption>
                        <IonSelectOption>Liberal Arts</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem className="drop-down-button">
                    <IonSelect placeholder="Major" className="center-elements"> 
                        <IonSelectOption>Software Engineering</IonSelectOption>
                        <IonSelectOption>Computer Science</IonSelectOption>
                        <IonSelectOption>Architectural Engineering</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonContent>
            
            <IonFooter className="transparent">
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.history.push('interestQuizPg2')}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
  };
  
  export default InterestQuizPg1;