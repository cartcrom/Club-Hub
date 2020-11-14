import React, {useState} from 'react';
import { IonContent, IonProgressBar, IonFooter, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider } from '@ionic/react';
import './InterestQuiz.css'
import { RouteComponentProps } from 'react-router';


const InterestQuizPg3 = (props: RouteComponentProps) => {
    const [selected, setSelected] = useState<string>('empty');
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.6}></IonProgressBar>
                <h2 id="quiz-header">I am Interested In:</h2>
                <IonList className="transparent">
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                        
                        <IonItem className="radio-box" >
                            <IonLabel>Performance + Arts</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="performingArts" />
                        </IonItem>

                        <IonItem className="radio-box">
                            <IonLabel>Publications + Media</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="publicationsMedia" />
                        </IonItem>

                        <IonItem className="radio-box">
                            <IonLabel>Service + Social Justice</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="serviceSocialJustice" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>Sports</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="sports" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>STEM</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="stem" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>Sustainability + Wellness</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="sustainabilityWellness" />
                        </IonItem>
                    </IonRadioGroup>
                    
                </IonList>
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.history.push('interestQuizPg4')}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonContent>
            
        </IonPage>
    );
  };
  
  export default InterestQuizPg3;