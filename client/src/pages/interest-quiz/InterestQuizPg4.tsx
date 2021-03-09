import React from "react";
import "./InterestQuiz.css";
import InterestQuizCheckboxTemplate from "./InterestQuizCheckboxTemplate";
import InterestQuizProps from "./InterestQuizProps";

const InterestQuizPg4 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Social", val: "Social" },
      { title: "Professional", val: "Professional" },
      { title: "Project Based", val: "Project" },
      { title: "Competition Based", val: "Competitive" },
      { title: "Religious", val: "Religious" }];

  return (
    <InterestQuizCheckboxTemplate {...props} checkboxes={checkboxes} isSubmit={true}/>
  );
};

export default InterestQuizPg4;