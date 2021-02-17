import React from 'react'
import {IonPage, IonToolbar, IonHeader, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonIcon, IonLabel, IonInput} from '@ionic/react'
import {globeOutline, helpOutline, logoFacebook, logoInstagram, mailOutline} from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

interface ClubMediaProps extends RouteComponentProps {
    editMedia: Function,
    media: {[key: string]: string},
}

const ClubSocials: React.FC<ClubMediaProps> = (props) => {
    const validMedia = [
        {name: 'Facebook', logo: logoFacebook},
        {name: 'Instagram', logo: logoInstagram},
        {name: 'Personal Website', logo: globeOutline}
    ]
    
    const mediaInput = validMedia.map(({name, logo}) => (
        <IonItem key={name}>
            <IonIcon icon={logo} slot="start"></IonIcon>
            <IonLabel>{name}:</IonLabel>
            <IonInput placeholder="link" value={props.media[name]} name={name} type='url'
                onIonChange={e => props.editMedia(name, e.detail.value)} ></IonInput>
        </IonItem>
    ))

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Social Media & More</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {mediaInput}
            </IonContent>
        </IonPage>
    );
};
export default ClubSocials