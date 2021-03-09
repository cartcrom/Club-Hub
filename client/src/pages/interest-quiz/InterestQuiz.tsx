import React from "react";
import { RouteComponentProps } from "react-router";
import API from "../../services/api";
import InterestQuizIntro from "./InterestQuizIntro";
import InterestQuizPg1 from "./InterestQuizPg1";
import InterestQuizPg2 from "./InterestQuizPg2";
import InterestQuizPg3 from "./InterestQuizPg3";
import InterestQuizPg4 from "./InterestQuizPg4";
import { UserContext } from "../../UserContext";

interface InterestQuizProps extends RouteComponentProps {
  skipQuiz: Function;
  finishQuiz: Function;
}

type QuizState = {
  page: number;
  college: string;
  major: string;
  interests: Array<string>;
};

export default class InterestQuiz extends React.Component<InterestQuizProps, QuizState> {
  //make update functions, pass those to pages, then push to context at end
  static contextType = UserContext;

  componentWillMount() {
    const interestArray: string[] = [];
    this.setState({
      page: 0,
      college: "",
      major: "",
      interests: interestArray
    });
  }

  submitQuiz = () => {
    console.log("submitting...");
    const user = this.context;
    if (!user || !user.id) {
      this.props.finishQuiz(this.state.interests, this.state.college, this.state.major);
      this.props.history.push("/feed");
      return;
    }
    API.updateInterests({collegeOf: this.state.college, major: this.state.major, interests: this.state.interests, id: user.id },
      () => { this.props.finishQuiz(this.state.interests, this.state.college, this.state.major); this.props.history.push("/feed"); },
      (err: any) => console.log(err));
  };

  updateSchoolInfo = (c: string, m: string) => {
    this.setState({
      college: c,
      major: m
    });
    console.log("college: %s, major: %s", c, m);
  };

  addInterest = (interest: string, checked: boolean) => {
    if (checked) {
      this.setState({
        interests: this.state.interests.concat(interest)
      });
    }
    else {
      const temp = [...this.state.interests]; //make separate copy of list
      const index = temp.indexOf(interest);
      if (index !== -1) {
        temp.splice(index, 1);
        this.setState({ interests: temp });
      }
    }

    console.log("---CURRENT INTEREST ARRAY----");
    this.state.interests.forEach(interest => {
      console.log("interest: %s ", interest);
    });


  };

  nextPage = () => {
    if (this.state.page >= 4) {
      this.submitQuiz();
    }
    else
      this.setState({
        page: (this.state.page + 1)
      });
  };

  skip = () => {
    this.props.skipQuiz();
    this.props.history.push("/feed");
  };

  book =
    [ <InterestQuizIntro nextPage={this.nextPage} skipQuiz={this.skip} />,
      <InterestQuizPg1 nextPage={this.nextPage} updateSchoolInfo={this.updateSchoolInfo} />,
      <InterestQuizPg2 nextPage={this.nextPage} addInterest={this.addInterest} />,
      <InterestQuizPg3 nextPage={this.nextPage} addInterest={this.addInterest} />,
      <InterestQuizPg4 nextPage={this.nextPage} addInterest={this.addInterest} />];

  render() {
    return (this.book[this.state.page]);

  }
}