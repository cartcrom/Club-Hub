import React, {useState} from 'react';
import { IonContent, IonProgressBar, IonFooter, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider } from '@ionic/react';
import './InterestQuiz.css'
import { RouteComponentProps } from 'react-router';


const InterestQuizPg2 = (props: RouteComponentProps) => {
    const [selected, setSelected] = useState<string>('empty');
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.3}></IonProgressBar>
                <h2 id="quiz-header">I am Interested In:</h2>
                <IonList className="transparent">
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                        
                        <IonItem className="radio-box" >
                            <IonLabel>Business</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="business" />
                        </IonItem>

                        <IonItem className="radio-box">
                            <IonLabel>Community Service</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="communityService" />
                        </IonItem>

                        <IonItem className="radio-box">
                            <IonLabel>Greek Life</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="greekLife" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>History, Law, and Politics</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="historyLawPolitics" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>Language and Culture</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="languageCulture" />
                        </IonItem>
                        <IonItem className="radio-box">
                            <IonLabel>Nature and Agriculture</IonLabel>
                            <IonRadio className="radio-button" slot="start" value="natureAgriculture" />
                        </IonItem>
                    </IonRadioGroup>
                    
                </IonList>
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.history.push('interestQuizPg3')}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonContent>
            
        </IonPage>
    );
  };
  
  export default InterestQuizPg2;