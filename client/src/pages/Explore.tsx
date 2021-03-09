import React, { useContext, useState } from "react";
import { IonCard, IonCardTitle, IonImg, IonAvatar, IonChip, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar } from "@ionic/react";
import "./Explore.css";
import { RouteComponentProps } from "react-router";
import { UserContext } from "../UserContext";
import Club from "../components/Club";
import Student from "../components/Student";
import { ClubContext } from "../ClubContext";


interface ClubCardProps extends RouteComponentProps {
  interests: Array<String>,
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = (props) => {
  // Sort tags based on commonality with user interests
  let tags = props.club.tags.sort((a,b) => ((props.interests.includes(b) ? 1 : 0) - (props.interests.includes(a) ? 1 : 0)) )
    .map(t => <IonChip key={t + props.club.name} className={(props.interests.includes(t)) ? "explore-tag-select" : "explore-tag"}>{t}</IonChip>)
  return(
    <IonCard key={props.club.id} button onClick={() => props.history.push('club/' + props.club.id)}>
      <IonImg src={props.club.bannerImage}></IonImg>
      <IonCardTitle className="cardHeader">{props.club.name}</IonCardTitle>
      <IonGrid>
        {tags}
      </IonGrid>
    </IonCard>
  );
};

const Explore: React.FC<RouteComponentProps> = (props) => {
  const user: Student | undefined = useContext(UserContext);
  if (user === undefined) {
    throw new Error("Undefined user error");
  }
  const clubs: Map<string, Club> | undefined = useContext(ClubContext);
  if (clubs === undefined) {
    throw new Error("Undefined clubs error");
  }

  let allClubs = Array.from(clubs!.values())
  let unjoinedClubs = allClubs.filter((c: Club) => !(user!.joined_clubs.includes(c.id)) && !(user!.lead_clubs.includes(c.id)))
    .sort((c1,c2) => (c2.tags.filter(t => user?.interests.includes(t)).length) -  (c1.tags.filter(t => user?.interests.includes(t)).length))

  const [currentTag, setCurrentTag] = useState<string>("");
  const [search, setSearch] = useState<string>();

  const interests = user.interests.map(interest =>
    <IonChip key={interest} className={(currentTag == interest) ? "explore-tag-select" : "explore-tag"} onClick={() => setCurrentTag((currentTag == "") ? interest : "")}>{interest}</IonChip>);

  const club_views = unjoinedClubs.filter((c => currentTag == "" || c.tags.includes(currentTag))).map(c => <ClubCard {...props} interests={user!.interests} key={c.name} club={c} />);

  const ExploreHome = () => {
    return (
      <div>
        <div className="everythingOnOneLine">
          {interests}
        </div>
        <IonText className="listHeader">{(currentTag == "") ? "Recommended" : currentTag + " clubs"}</IonText>
        <IonList>
          {club_views}
        </IonList>
      </div>
    );
  };

  const SearchResult = (stats: { club: Club; }) => {

    return (
      <IonItem lines="none" onClick={() => props.history.push("club/" + stats.club.id)}>
        <IonAvatar slot="start">
          <img className="club-image" src={stats.club.profileImage} />
        </IonAvatar>
        <IonLabel className="club-item">
          {stats.club.name}
        </IonLabel>
      </IonItem>
    );
  };

  const SearchView = () => {

    let search_list = allClubs.filter(c => c.name.toLowerCase().indexOf(search!.toLowerCase()) > -1)
    
    let Searches = search_list.map((c) => <SearchResult key={c.name} club={c}></SearchResult>)

    return (
      <div>
        {Searches}
      </div>
    )
  }
  let Content = () => { return (search == undefined || search == "") ? <ExploreHome/> : <SearchView/> }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
          <IonSearchbar  className="search" value={search} placeholder="search" onIonChange={e => setSearch(e.detail.value!)}></IonSearchbar>
          <Content/>
            
      </IonContent>
    </IonPage>
  );
};
export default Explore;