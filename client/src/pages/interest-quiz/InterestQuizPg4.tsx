import React from "react";
import "./InterestQuiz.css";
import InterestQuizCheckboxTemplate from "./InterestQuizCheckboxTemplate";

interface InterestQuizProps {
  nextPage: Function
  addInterest: Function
}

const InterestQuizPg4 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Social", val: "Social" },
      { title: "Professional", val: "Professional" },
      { title: "Project Based", val: "Project" },
      { title: "Competition Based", val: "Competitive" },
      { title: "Religious", val: "Religious" }];

  return (
    <InterestQuizCheckboxTemplate {...props} checkboxes={checkboxes} />
  );
};

export default InterestQuizPg4;