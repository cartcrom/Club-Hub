import React, { useState } from 'react'; 
import { Route, RouteComponentProps, Switch } from 'react-router';
import ClubRegistration from './ClubRegistration';
import ClubSocials from './ClubSocials';
import ClubTypes from './ClubTypes';

export const ClubRegistrationManager: React.FC<RouteComponentProps> = props => {
  const [tags, setTags] = useState<string[]>([]);
  const [media, setMedia] = useState< {[key: string]: string}>({
    'Facebook': '',
    'Instagram': '',
    'Personal Website': ''
  });
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [profile, setProfile] = useState<string>(process.env.PUBLIC_URL + '/avatar.svg');
  const [banner, setBanner] = useState<string>('');

  const clubRegistrationProps = {
    name, setName, description, setDescription, profile, setProfile, banner, setBanner,
  }

  function addTag(isChecked: boolean, tag: string) {
    if(isChecked) {
      setTags([...tags, tag])
    }
    else {
      let tagCopy = [...tags]
      setTags(tagCopy.filter(item => item !== tag))
    }
  }

  function editMedia(mediaType: string, url: string) {
    let mediaCopy = {...media}
    mediaCopy[mediaType] = url
    setMedia(mediaCopy)
  }

  return (
    <Switch>
      <Route exact path={`${props.match.url}/clubTypes`} render={(props) => <ClubTypes {...props} addTag={addTag} tags={tags}/>} />
      <Route exact path={`${props.match.url}/clubSocials`} render={(props) => <ClubSocials {...props} editMedia={editMedia} media={media} />} />
      <Route exact path={props.match.url} render={(props) => <ClubRegistration {...props} tags={tags} media={media} {... clubRegistrationProps} />} />
    </Switch>
  )
}