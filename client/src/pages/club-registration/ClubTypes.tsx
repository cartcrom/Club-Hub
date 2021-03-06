import React from "react";
import { IonContent, IonHeader, IonPage, IonItem, IonCheckbox, IonLabel, IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { RouteComponentProps } from "react-router";

interface ClubTypeProps extends RouteComponentProps {
  addTag: Function,
  tags: string[];
}

const ClubTypes: React.FC<ClubTypeProps> = (props) => {
  const checkboxes =
    [ { title: "Business", val: "business" },
      { title: "Community Service", val: "service" },
      { title: "Greek Life", val: "greek" },
      { title: "History, Law, and Politics", val: "history" },
      { title: "Language and Culture", val: "culture" },
      { title: "Nature and Agriculture", val: "nature" },
      { title: "Performance + Arts", val: "performingArts" },
      { title: "Publications + Media", val: "publicationsMedia" },
      { title: "Service + Social Justice", val: "serviceSocialJustice" },
      { title: "Sports", val: "sports" },
      { title: "STEM", val: "stem" },
      { title: "Sustainability + Wellness", val: "sustainability" },
      { title: "Social", val: "social" },
      { title: "Professional", val: "professional" },
      { title: "Project Based", val: "project" },
      { title: "Competition Based", val: "competition" },
      { title: "Religious", val: "religious" }];

  const checkboxList = checkboxes.map(({ title, val }, i) => (
    <IonItem key={i}>
      <IonCheckbox slot="start" value={title} checked={props.tags.includes(title)}
        onIonChange={e => props.addTag(e.detail.checked, e.detail.value)}></IonCheckbox>
      <IonLabel>{title}</IonLabel>
    </IonItem>
  ));

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
export default ClubTypes;
