import React, { useState } from "react";
import { Radio, Button } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

interface QuestionData {
    Question: string;
    Answers: {
      Correct: string[];
      Incorrect: string[];
    };
  }
  

function Edit_Quiz () {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const questionData: QuestionData = {
    Question: "What is the capital of France?",
    Answers: {
      Correct: ["Paris"],
      Incorrect: ["London", "New York", "Berlin"]
    }
  };

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  const checkAnswer = () => {
    setShowFeedback(true);
  };

  return (
    <div>
      <h2>{questionData.Question}</h2>
      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        {questionData.Answers.Correct.concat(questionData.Answers.Incorrect).map((option, index) => (
          <Radio key={index} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      <Button type="primary" onClick={checkAnswer}>
        Check Answer
      </Button>
      {showFeedback && (
        <div>
          {questionData.Answers.Correct.includes(selectedOption || '') ? (
            <p><strong>Correct!</strong> {selectedOption} is the correct answer.</p>
          ) : (
            <p><strong>Incorrect!</strong> The correct answer is Paris.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Edit_Quiz;