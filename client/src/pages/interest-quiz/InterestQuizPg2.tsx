import React from "react";
import "./InterestQuiz.css";
import InterestQuizCheckboxTemplate from "./InterestQuizCheckboxTemplate";
import InterestQuizProps from "./InterestQuizProps";


const InterestQuizPg2 = (props: InterestQuizProps) => {
  const checkboxes =
    [ { title: "Business", val: "Business" },
      { title: "Community Service", val: "Service" },
      { title: "Greek Life", val: "Greek Life" },
      { title: "History, Law, and Politics", val: "History" },
      { title: "Language and Culture", val: "Culture" },
      { title: "Nature and Agriculture", val: "Nature" }];


  return (
    <InterestQuizCheckboxTemplate {...props} checkboxes={checkboxes} />
  );
};

export default InterestQuizPg2;