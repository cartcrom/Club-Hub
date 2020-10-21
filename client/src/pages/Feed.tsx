import React, { useRef } from 'react';
import {  IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Feed.css';
import '../global_styles.css';

import john from '../images/john.jpg'
import heart from '../images/rsz_heart.png'
import ice from '../images/rsz_ice_cream.jpg'


function fetch_posts() {

  // Call backend here to get posts, for now use this sample data
  let test_post : Post_Data = {club_name: "Cal Poly Ice Cream Club", club_image: ice,
  description: "Eat ice cream angrily", date: "May 2nd", time: "12pm - 5pm", title: "Agressive Ice Cream Eating", image: john}
  let post_data = [test_post]

  let posts : Array<JSX.Element> = [];
  post_data.forEach((data : Post_Data) => 
    posts.push(<Post key={data.title} post={data}/>)  
  )
  return posts;
}

const Feed: React.FC = () => {
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle >ClubHub</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonInfiniteScroll>
            <IonList>
              {fetch_posts()}
            </IonList>
          </IonInfiniteScroll>

      </IonContent>
    </IonPage>
  );
};

interface Post_Data {
  club_name: string;
  club_image: string;
  description: string;
  date: string;
  image: string;
  time: string;
  title: string;
}

interface PostProps {
  post: Post_Data;
}

const Post: React.FC<PostProps> = (props) => {
  return (
    <IonItem>
      <IonCol>
        <IonItemDivider className="club-banner" > 
          <IonRow>
            <IonImg src={props.post.club_image}></IonImg>
            <IonCol>{props.post.club_name}</IonCol>
          </IonRow>
        </IonItemDivider>
        <IonRow><IonImg src={props.post.image}></IonImg></IonRow>
        <IonItemDivider className="details">
          <IonCol>{props.post.title}</IonCol>
          <IonCol>{props.post.date}</IonCol>
          <IonCol>{props.post.time}</IonCol>
        </IonItemDivider>
        <IonRow>
          <IonImg src={heart}></IonImg>
          <IonCol>{props.post.description}</IonCol>
        </IonRow>
      </IonCol>
    </IonItem>
  )
}

export default Feed;
