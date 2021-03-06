import React, { useContext } from "react";
import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { RouteComponentProps } from "react-router";
//import { Plugins } from "@capacitor/core";
import "./ClubRegistration.css";
import { UserContext } from "../../UserContext";
import API from "../../services/api";

interface ClubRegistrationProps extends RouteComponentProps {
  tags: string[],
  media: { [key: string]: string; },
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
  //const { Camera } = Plugins;
  //const [profileUploaded, setProfileUploaded] = useState<boolean>(false);
  const student = useContext(UserContext);

  /*const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    //setProfile(image.webPath);
    setProfileUploaded(true);
  };*/

  // Images
  const defaultProfile = process.env.PUBLIC_URL + "/avatar.svg";

  const bannerImage = {
    backgroundImage: `url(${props.banner})`,
    backgroundSize: "cover",
  };

  const defaultBanner = {
    backgroundImage: "linear-gradient(145deg, rgba(255,112,147,1) 0%, rgba(119,64,255,1) 75%, rgba(83,55,255,1) 100%)"
  };

  //Submit
  function handleSubmit() {

    if (!student) {
      alert("Student Undefined");
      return;
    }

    const newClub = {
      name: props.name,
      description: props.description,
      profileImage: props.profile,
      bannerImage: props.banner,
      tags: props.tags,
      media: props.media,
      school: student.school,
      leaderId: student.id,
    };
    API.createClub(newClub, (data: any) => { props.addClub(data); props.history.push("tab2"); }, (err: any) => console.log(err));

  }

  // Other
  const providedMedia = Object.keys(props.media).filter((m: string) => props.media[m] != "");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register your Club!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonItemGroup>
          <div className="center vertical" id="profile-holder" style={props.banner ? bannerImage : defaultBanner}>
            <IonAvatar id="profile">
              <img src={props.profile ? props.profile : defaultProfile} />
            </IonAvatar>
            {/* <IonButton fill="clear" onClick={() => takePhoto()}>{profileUploaded ? "Change" : "Upload"}</IonButton> */}
          </div>
          <IonItemDivider>
            <IonLabel>General Info</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={props.name} onIonChange={(e) => props.setName(e.detail.value ? e.detail.value : "")}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea value={props.description} onIonChange={(e) => props.setDescription(e.detail.value ? e.detail.value : "")}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Profile Image URL</IonLabel>
            <IonInput type="url" value={props.profile} onIonChange={e => props.setProfile(e.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Banner Image URL</IonLabel>
            <IonInput type="url" value={props.banner} onIonChange={e => props.setBanner(e.detail.value)}/>
          </IonItem>
        </IonItemGroup>

        {/* <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Meetings</IonLabel>
          </IonItemDivider>
          <IonItem detail button onClick={() => props.history.push("daysOfWeek")}>
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

          <IonItem detail button onClick={() => props.history.push("clubRegistration/clubTypes")}>
            <IonLabel>Tags{!!props.tags.length && ":"} {props.tags.join(", ")}</IonLabel>
          </IonItem>

          <IonItem detail button onClick={() => props.history.push("clubRegistration/clubSocials")}>
            <IonLabel>Social Media{!!providedMedia.length && ":"} {providedMedia.join(", ")}</IonLabel>
          </IonItem>

        </IonItemGroup>
        <IonButton expand="full" size="large" onClick={handleSubmit}>Done!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ClubRegistration;
