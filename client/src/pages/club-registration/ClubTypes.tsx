import React from 'react'
import {IonContent, IonHeader, IonPage, IonItem, IonCheckbox, IonLabel, IonToolbar, IonTitle, IonButtons, IonBackButton} from '@ionic/react'
import { RouteComponentProps } from 'react-router';

interface ClubTypeProps extends RouteComponentProps {
    addTag: Function,
    tags: string[]
}

const ClubTypes: React.FC<ClubTypeProps> = (props) => {
    const checkboxes = 
    [{ title: "Business", val: "Business" },
     { title: "Community Service", val: "Service" },
     { title: "Greek Life", val: "Greek Life" },
     { title: "History, Law, and Politics", val: "History" },
     { title: "Language and Culture", val: "Culture" },
     { title: "Nature and Agriculture", val: "Nature" },
     { title: "Performance + Arts", val: "Performance + Arts" },
     { title: "Publications + Media", val: "Media" },
     { title: "Social Justice", val: "Social Justice" },
     { title: "Sports", val: "Sports" },
     { title: "STEM", val: "STEM" },
     { title: "Sustainability + Wellness", val: "Sustainability" },
     { title: "Social", val: "Social" },
     { title: "Professional", val: "Professional" },
     { title: "Project Based", val: "Project" },
     { title: "Competition Based", val: "Competitive" },
     { title: "Religious", val: "Religious" }]

     const checkboxList = checkboxes.map(({title, val}, i) => (
        <IonItem key={i}>
            <IonCheckbox slot="start" value={title} checked={props.tags.includes(title)}
                onIonChange={e => props.addTag(e.detail.checked, e.detail.value)}></IonCheckbox>
            <IonLabel>{title}</IonLabel>
        </IonItem>
     ))

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Club Type</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {checkboxList}
            </IonContent>
        </IonPage>
    );
};
export default ClubTypes
