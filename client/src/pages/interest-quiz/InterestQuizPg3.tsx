import React, {useState} from 'react';
import { IonContent, IonProgressBar, IonFooter, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider, IonCheckbox } from '@ionic/react';
import './InterestQuiz.css'

interface InterestQuizProps {
    nextPage: Function
}

const InterestQuizPg3 = (props: InterestQuizProps) => {
    const [selected, setSelected] = useState<string>('empty');
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.6}></IonProgressBar>
                <h2 id="quiz-header">I am Interested In:</h2>
                <IonList className="transparent">
                        
                    <IonItem className="checkbox-box" >
                        <IonLabel>Performance + Arts</IonLabel>
                        <IonCheckbox className="checkbox" slot="start" value="performingArts" />
                    </IonItem>

                    <IonItem className="checkbox-box">
                        <IonLabel>Publications + Media</IonLabel>
                        <IonCheckbox className="checkbox" slot="start" value="publicationsMedia" />
                    </IonItem>

                    <IonItem className="checkbox-box">
                        <IonLabel>Service + Social Justice</IonLabel>
                        <IonCheckbox className="checkbox" slot="start" value="serviceSocialJustice" />
                    </IonItem>
                    <IonItem className="checkbox-box">
                        <IonLabel>Sports</IonLabel>
                        <IonCheckbox className="checkbox" slot="start" value="sports" />
                    </IonItem>
                    <IonItem className="checkbox-box">
                        <IonLabel>STEM</IonLabel>
                        <IonCheckbox className="checkbox" slot="start" value="stem" />
                    </IonItem>
                    <IonItem className="checkbox-box">
                        <IonLabel>Sustainability + Wellness</IonLabel>
                        <IonCheckbox className="checkbox" slot="start" value="sustainabilityWellness" />
                    </IonItem>
                    
                </IonList>
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.nextPage()}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonContent>
            
        </IonPage>
    );
  };
  
  export default InterestQuizPg3;