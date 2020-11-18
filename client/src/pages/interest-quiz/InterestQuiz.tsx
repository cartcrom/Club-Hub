import React from 'react';
import { RouteComponentProps } from 'react-router';

import { IonContent, IonLabel, IonPage, IonFooter, IonItem, IonButtons, IonHeader, IonToolbar, IonButton} from '@ionic/react';

import InterestQuizIntro from './InterestQuizIntro';
import InterestQuizPg1 from './InterestQuizPg1';
import InterestQuizPg2 from './InterestQuizPg2';
import InterestQuizPg3 from './InterestQuizPg3';
import InterestQuizPg4 from './InterestQuizPg4';

interface InterestQuizProps extends RouteComponentProps {
    skipQuiz: Function;
    finishQuiz: Function;
}

type QuizState = {
    page: number;
}

export default class InterestQuiz extends React.Component<InterestQuizProps, QuizState> {

    componentWillMount() {
        this.setState({
          page: 0,
        });
    }

    nextPage = () => {
        if (this.state.page >= 4) {
            this.props.history.push("/feed");
        }
        else
        this.setState({
            page: (this.state.page + 1)
        })
    }

    skip = () => {
        this.props.skipQuiz();
        this.props.history.push("/feed");
    }

    render() {
        switch(this.state.page) {
            case 0:
                return(
                    <InterestQuizIntro nextPage={this.nextPage} skipQuiz={this.skip}/>
                )
                break;
            case 1:
                return(
                    <InterestQuizPg1 nextPage={this.nextPage}/>
                )
                break;
            case 2:
                return(
                    <InterestQuizPg2 nextPage={this.nextPage}/>
                )
                break;
            case 3:
                return(
                    <InterestQuizPg3 nextPage={this.nextPage}/>
                )
                break;
            case 4:
                return(
                    <InterestQuizPg4 nextPage={this.nextPage}/>
                )
                break;
        
       }
    }
};
