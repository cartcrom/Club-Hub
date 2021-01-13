import React, {useState} from 'react';
import { IonContent, IonProgressBar, IonFooter, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider, IonCheckbox } from '@ionic/react';
import './InterestQuiz.css';

interface InterestQuizProps {
    nextPage: Function
}

const InterestQuizPg2 = (props: InterestQuizProps) => {
    const [selected, setSelected] = useState<string>('empty');
    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.3}></IonProgressBar>
                <h2 id="quiz-header">I am Interested In:</h2>
                <IonList className="transparent">

                        <IonItem className="checkbox-box" >
                            <IonLabel>Business</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value="business" />
                        </IonItem>

                        <IonItem className="checkbox-box">
                            <IonLabel>Community Service</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value="communityService" />
                        </IonItem>

                        <IonItem className="checkbox-box">
                            <IonLabel>Greek Life</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value="greekLife" />
                        </IonItem>

                        <IonItem className="checkbox-box">
                            <IonLabel>History, Law, and Politics</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value="historyLawPolitics" />
                        </IonItem>
                    
                        <IonItem className="checkbox-box">
                            <IonLabel>Language and Culture</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value="languageCulture" />
                        </IonItem>

                        <IonItem className="checkbox-box">
                            <IonLabel>Nature and Agriculture</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value="natureAgriculture" />
                        </IonItem>
                   
                    
                </IonList>
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.nextPage()}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonContent>
            
        </IonPage>
    );
  };
  
  export default InterestQuizPg2;