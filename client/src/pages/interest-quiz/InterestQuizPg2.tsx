import React, {useState} from 'react';
import { IonContent, IonProgressBar, IonFooter, IonPage, IonTitle, IonToolbar, IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonItemDivider, IonCheckbox } from '@ionic/react';
import './InterestQuiz.css';
import { map } from 'ionicons/icons';

interface InterestQuizProps {
    nextPage: Function
    addInterest: Function
}

const InterestQuizPg2 = (props: InterestQuizProps) => {
    const [checked, setChecked] = useState(false)
    const checkboxes = 
    [{ title: "Business", val: "business" },
     { title: "Community Service", val: "service" },
     { title: "Greek Life", val: "greek" },
     { title: "History, Law, and Politics", val: "history" },
     { title: "Language and Culture", val: "culture" },
     { title: "Nature and Agriculture", val: "nature" }]
    

    return (
        <IonPage>
            <IonContent fullscreen className="quiz-gradient" >
                <IonProgressBar className="progress-bar" color="secondary" value={0.3}></IonProgressBar>
                <h2 id="quiz-header">I am Interested In:</h2>
                <IonList className="transparent">
                    {checkboxes.map(({ title, val }, i) => (
                        <IonItem className="checkbox-box" key={i}>
                            <IonLabel>{title}</IonLabel>
                            <IonCheckbox className="checkbox" slot="start" value={val} onIonChange={e => props.addInterest(e.detail.value, e.detail.checked)} />
                        </IonItem>
                    ))}
                </IonList>
    
                <IonItem button detail={false} className="white-outline-button" onClick={() => props.nextPage()}>
                    <IonLabel>next</IonLabel>
                </IonItem>
            </IonContent>
            
        </IonPage>
    );
  };
  
  export default InterestQuizPg2;