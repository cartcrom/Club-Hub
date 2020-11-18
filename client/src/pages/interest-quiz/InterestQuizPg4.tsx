import React, {useState} from 'react';
import { IonContent, IonProgressBar, IonFooter, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider } from '@ionic/react';
import './InterestQuiz.css';

interface InterestQuizProps {
    nextPage: Function
}

const InterestQuizPg4 = (props: InterestQuizProps) => {
    const [selected, setSelected] = useState<string>('empty');
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.8}></IonProgressBar>
                <h2 id="quiz-header">I am Looking For:</h2>
                <IonList className="transparent">
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                        
                        <IonItem className="radio-box" >
                            <IonLabel>Social</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="social" />
                        </IonItem>

                        <IonItem className="radio-box">
                            <IonLabel>Professional</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="professional" />
                        </IonItem>

                        <IonItem className="radio-box">
                            <IonLabel>Project Based</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="projectBased" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>Competition Based</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="competitionBased" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>Religious</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="religious" />
                        </IonItem>
                        
                    </IonRadioGroup>
                    
                </IonList>
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.nextPage()}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonContent>
            
        </IonPage>
    );
  };
  
  export default InterestQuizPg4;