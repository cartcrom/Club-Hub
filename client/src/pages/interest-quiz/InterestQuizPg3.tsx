import React from "react";
import "./InterestQuiz.css";
import InterestQuizCheckboxTemplate from "./InterestQuizCheckboxTemplate";

interface InterestQuizProps {
  nextPage: Function
  addInterest: Function
}

const InterestQuizPg3 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Performance + Arts", val: "Performance + Arts" },
      { title: "Publications + Media", val: "Media" },
      { title: "Social Justice", val: "Social Justice" },
      { title: "Sports", val: "Sports" },
      { title: "STEM", val: "STEM" },
      { title: "Sustainability + Wellness", val: "Sustainability" }];


  return (
    <InterestQuizCheckboxTemplate {...props} checkboxes={checkboxes} />
  );
};

export default InterestQuizPg3;