import React, { useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import ClubRegistration from "./ClubRegistration";
import ClubSocials from "./ClubSocials";
import ClubTypes from "./ClubTypes";

interface ManagerProps extends RouteComponentProps {
  addClub: Function;
}

export const ClubRegistrationManager: React.FC<ManagerProps> = props => {
  const [tags, setTags] = useState<string[]>([]);
  const [media, setMedia] = useState<{ [key: string]: string; }>({
    "Facebook": "",
    "Instagram": "",
    "Personal Website": ""
  });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const addClub = props.addClub;

  const clubRegistrationProps = {
    name, setName, description, setDescription, profile, setProfile, banner, setBanner, addClub,
  };

  function addTag(isChecked: boolean, tag: string) {
    if (isChecked) {
      setTags([...tags, tag]);
    }
    else {
      const tagCopy = [...tags];
      setTags(tagCopy.filter(item => item !== tag));
    }
  }

  function editMedia(mediaType: string, url: string) {
    const mediaCopy = { ...media };
    mediaCopy[mediaType] = url;
    setMedia(mediaCopy);
  }

  return (
    <Switch>
      <Route exact path={`${props.match.url}/clubTypes`} render={(props) => <ClubTypes {...props} addTag={addTag} tags={tags} />} />
      <Route exact path={`${props.match.url}/clubSocials`} render={(props) => <ClubSocials {...props} editMedia={editMedia} media={media} />} />
      <Route exact path={props.match.url} render={(props) => <ClubRegistration {...props} tags={tags} media={media} {...clubRegistrationProps} />} />
    </Switch>
  );
};