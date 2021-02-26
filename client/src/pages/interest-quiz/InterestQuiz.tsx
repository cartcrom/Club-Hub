import React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { backend_URL } from '../../constants'
import InterestQuizIntro from './InterestQuizIntro';
import InterestQuizPg1 from './InterestQuizPg1';
import InterestQuizPg2 from './InterestQuizPg2';
import InterestQuizPg3 from './InterestQuizPg3';
import InterestQuizPg4 from './InterestQuizPg4';
import { UserContext } from '../../UserContext';


interface InterestQuizProps extends RouteComponentProps {
    skipQuiz: Function;
    finishQuiz: Function;
}

type QuizState = {
    page: number;
    schoolName: string;
    college: string;
    major: string;
    interests: Array<string>;
}

type SubmitReponse = {
    data : boolean;
}

export default class InterestQuiz extends React.Component<InterestQuizProps, QuizState> {
    //make update functions, pass those to pages, then push to context at end
    context!: React.ContextType<typeof UserContext>

    componentWillMount() {
        var interestArray:string[] = [];
        this.setState({
          page: 0,
          schoolName: "",
          college: "",
          major: "",
          interests: interestArray
        });
    }

    submitQuiz = () => {
        let user = this.context;
        if (!user || !user.id) {
            this.props.finishQuiz(this.state.interests, this.state.schoolName,this.state.college,this.state.major);
            this.props.history.push("/feed");
            return
        }

        axios.post(backend_URL + '/intrest/quiz', {
            school: this.state.schoolName,
            collegeOf: this.state.college,
            major: this.state.major,
            interests: this.state.interests
        }).then((res : SubmitReponse) => {
            // handle success
            console.log(res);
            if (res.data) {
                this.props.finishQuiz(this.state.interests, this.state.schoolName,this.state.college,this.state.major);
            }
            else {
                console.log("Interest Quiz Submission Error")
            }
            this.props.history.push("/feed");
            })
            .catch((err : any) => {
            // handle error
            if (!err.response) {
                // network error
                alert("Network Connection Error");
            } else {
                console.log(err);
            }
          })
          .then(function () {
            // always executed
        });
        
    }

    updateSchoolInfo = (c:string, m:string) => {
        this.setState({
            college: c,
            major: m
        })
        console.log("college: %s, major: %s", c, m)
    }

    addInterest = (interest: string, checked:boolean) => {    
        if (checked){
            this.setState({
                interests: this.state.interests.concat(interest)
            })
        }
        else{
            let temp = [...this.state.interests] //make separate copy of list
            let index = temp.indexOf(interest)
            if (index !== -1) {
                temp.splice(index, 1);
                this.setState({interests: temp});
              }
        }
        
        console.log("---CURRENT INTEREST ARRAY----")
        this.state.interests.forEach(interest => {
            console.log("interest: %s ", interest)
        });
        
        
    }

    nextPage = () => {
        if (this.state.page >= 4) {
            this.submitQuiz();
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
                    <InterestQuizPg1 nextPage={this.nextPage} updateSchoolInfo={this.updateSchoolInfo}/>
                )
                break;
            case 2:
                return(
                    <InterestQuizPg2 nextPage={this.nextPage} addInterest={this.addInterest}/>
                )
                break;
            case 3:
                return(
                    <InterestQuizPg3 nextPage={this.nextPage} addInterest={this.addInterest}/>
                )
                break;
            case 4:
                return(
                    <InterestQuizPg4 nextPage={this.nextPage} addInterest={this.addInterest}/>
                )
                break;
        
       }
    }
};
