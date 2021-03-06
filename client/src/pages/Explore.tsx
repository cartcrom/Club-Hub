import React, { useContext, useState } from 'react';
import { IonCard, IonCardTitle, IonImg, IonAvatar,  IonChip,  IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Explore.css';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../UserContext';
import Club from '../components/Club';
import Student from '../components/Student';
import { ClubContext } from '../ClubContext';


interface ClubCardProps extends RouteComponentProps {
  club: Club
}

const ClubCard: React.FC<ClubCardProps> = (props) => {

  let tags = props.club.tags.map(t => <IonChip key={t + props.club.name} className="tag">{t}</IonChip>)
  return(
    <IonCard key={props.club.id} button onClick={() => props.history.push('club/' + props.club.id)}>
      <IonImg src={props.club.bannerImage}></IonImg>
      <IonCardTitle className="cardHeader">{props.club.name}</IonCardTitle>
      <IonGrid>
          {tags}
      </IonGrid>
    </IonCard>
  )
}

const Explore: React.FC<RouteComponentProps> = (props) => {
  let user: Student | undefined = useContext(UserContext)
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  let clubs : Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  const [currentTag, setCurrentTag] = useState<string>("");
  const [search, setSearch] = useState<string>();
  const [query, setQuery] = useState<string>();

  const onChange = (value: string) => {
    setSearch(value);
    setQuery(value);
  }

  let interests = user.interests.map(interest => 
    <IonChip key={interest} className="explore-tag" onClick={() => setCurrentTag((currentTag == "") ? interest : "")}>{interest}</IonChip>)


  let club_views = Array.from(clubs.values()).map(c => {
    if (currentTag == "" || c.tags.includes(currentTag))
      return <ClubCard {...props} key={c.name} club={c}/>
  })



  const ExploreHome = () => {
    return(
      <div>
        <div className="everythingOnOneLine">
              {interests}
            </div>
        <IonText className="listHeader">Recommended</IonText>
        <IonList>
          {club_views}
        </IonList>
      </div>
    )
  }

  const SearchResult = (stats : {club : Club}) => {

    return(
      <IonItem lines="none" onClick={() => props.history.push('club/' + stats.club.id) }>
        <IonAvatar slot="start">
          <img className="club-image" src={stats.club.profileImage} />
        </IonAvatar>
        <IonLabel className="club-item">
          {stats.club.name}
        </IonLabel>
      </IonItem>
    )
  }

  const SearchView = () => {
    let club_list = Array.from(clubs!.values())
    club_list = club_list.filter(c => c.name.toLowerCase().indexOf(query!.toLowerCase()) > -1)
    
    let Searches = club_list.map((c) => <SearchResult key={c.name} club={c}></SearchResult>)

    return(
      <div>
        {Searches}
      </div>
    )
  }
  let Content = () => { return (query == undefined || query == "") ? <ExploreHome/> : <SearchView/> }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
          <IonSearchbar  className="search" value={search} placeholder="search" onIonChange={e => onChange(e.detail.value!)}></IonSearchbar>
          <Content/>
            
      </IonContent>
    </IonPage>
  );
};
export default Explore;