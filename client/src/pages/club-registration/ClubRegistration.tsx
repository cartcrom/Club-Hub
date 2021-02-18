import React, { useContext, useState } from 'react';
import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonRouterOutlet, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType} from '@capacitor/core';
import './ClubRegistration.css'
import { UserContext } from '../../UserContext';
import axios from 'axios';

interface ClubRegistrationProps extends RouteComponentProps {
  tags: string[],
  media: {[key: string]: string},
  name: string,
  description: string,
  profile: string,
  banner: string,
  setName: Function,
  setDescription: Function,
  setProfile: Function,
  setBanner: Function,
  addClub: Function,
}

const ClubRegistration: React.FC<ClubRegistrationProps> = (props) => {
  const {Camera} = Plugins;
  const [profileUploaded, setProfileUploaded] = useState<boolean>(false);
  const student = useContext(UserContext)  

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    //setProfile(image.webPath);
    setProfileUploaded(true);
  }

  // Profile Images
  const defaultProf = process.env.PUBLIC_URL + '/avatar.svg'
  const diamondProf = 'https://images.unsplash.com/photo-1546026502-797e11a59f50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  const rainbowProf = 'https://images.unsplash.com/flagged/photo-1579268351234-073f85929562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
  const spiralProf = 'https://images.unsplash.com/photo-1591616369924-833532b76ebc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=937&q=80'
  const curlProf = 'https://images.unsplash.com/photo-1598339990682-db6df0fb0529?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'  
  const brickProf = 'https://images.unsplash.com/photo-1544938400-bdf4ea7a2e43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  const geometryProf = 'https://images.unsplash.com/photo-1555679445-50a1042ea2b3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=669&q=80'
  
  // Banner Images
  let bannerImage = {
    backgroundImage: `url(${props.banner})`,
    backgroundSize: 'cover',
  }

  let defaultBanner = {
    backgroundImage: 'linear-gradient(145deg, rgba(255,112,147,1) 0%, rgba(119,64,255,1) 75%, rgba(83,55,255,1) 100%)'
  }

  const beachImg = 'https://images.unsplash.com/photo-1530194579541-703b0bbc9363?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80'
  const mountainImg = 'https://images.unsplash.com/photo-1612875895771-76bba1a61a49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  const desertImg = 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  const arcImg = 'https://images.unsplash.com/photo-1602003729508-c3c55a51bc20?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  const techImg = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  const travelImg = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80'
  const busImg = 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

  //Submit
  function handleSubmit() {

    const newClub = {
      name: props.name,
      description: props.description,
      profileImage: props.profile,
      bannerImage: props.banner,
      tags: props.tags,
      media: props.media,
      school: student?.school,
      leaderId: student?.id,
    }
    try {
      axios.post('http://localhost:5000/add/club', newClub)
      .then((res) => {
        props.addClub(res.data)
      })
      .catch((err) => console.log(err))
      // props.addClub(backendClub)
    }
    catch (e) {
      console.error(e)
    }
    props.history.push('tab2')

  }

  // Other
  const providedMedia = Object.keys(props.media).filter((m: string) => props.media[m] != '')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register your Club!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonItemGroup>
          <div className="center vertical" id="profile-holder" style={!!props.banner ? bannerImage : defaultBanner}>
            <IonAvatar id="profile">
              <img src={props.profile} />
            </IonAvatar>
            {/* <IonButton fill="clear" onClick={() => takePhoto()}>{profileUploaded ? 'Change' : 'Upload'}</IonButton> */}
          </div>
          <IonItemDivider>
            <IonLabel>General Info</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={props.name} onIonChange={(e) => props.setName(e.detail.value ? e.detail.value : '')}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea value={props.description} onIonChange={(e) => props.setDescription(e.detail.value ? e.detail.value : '')}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel>Profile Image</IonLabel>
            <IonSelect value={props.profile} onIonChange={e => props.setProfile(e.detail.value)}>
              <IonSelectOption value={defaultProf}>Default</IonSelectOption>
              <IonSelectOption value={diamondProf}>Diamond</IonSelectOption>
              <IonSelectOption value={rainbowProf}>Rainbow</IonSelectOption>
              <IonSelectOption value={spiralProf}>Spiral</IonSelectOption>
              <IonSelectOption value={curlProf}>Curls</IonSelectOption>
              <IonSelectOption value={brickProf}>Bricks</IonSelectOption>
              <IonSelectOption value={geometryProf}>Geometry</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Banner Image</IonLabel>
            <IonSelect value={props.banner} onIonChange={e => props.setBanner(e.detail.value)}>
              <IonSelectOption value=''>Default</IonSelectOption>
              <IonSelectOption value={beachImg}>Beach</IonSelectOption>
              <IonSelectOption value={mountainImg}>Mountain</IonSelectOption>
              <IonSelectOption value={desertImg}>Desert</IonSelectOption>
              <IonSelectOption value={arcImg}>Architecture</IonSelectOption>
              <IonSelectOption value={techImg}>Technology</IonSelectOption>
              <IonSelectOption value={travelImg}>Travel</IonSelectOption>
              <IonSelectOption value={busImg}>Business</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonItemGroup>

        {/* <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Meetings</IonLabel>
          </IonItemDivider>
          <IonItem detail button onClick={() => props.history.push('daysOfWeek')}>
            <IonLabel>Day Of Week</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Start</IonLabel>
            <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="12:00"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>End</IonLabel>
            <IonDatetime display-format="h:mm a" picker-format="h:mm a" value="13:00"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Meeting Location</IonLabel>
            <IonInput></IonInput>
          </IonItem>
        </IonItemGroup> */}



        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>More Info</IonLabel>
          </IonItemDivider>

          <IonItem detail button onClick={() => props.history.push('clubRegistration/clubTypes')}>
            <IonLabel>Tags{!!props.tags.length && ':'} {props.tags.join(', ')}</IonLabel>
          </IonItem>

          <IonItem detail button onClick={() => props.history.push('clubRegistration/clubSocials')}>
            <IonLabel>Social Media{!!providedMedia.length && ':'} {providedMedia.join(', ')}</IonLabel>
          </IonItem>
          
        </IonItemGroup>
        <IonButton expand="full" size="large" onClick={handleSubmit}>Done!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ClubRegistration;
