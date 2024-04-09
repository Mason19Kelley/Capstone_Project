import React, { useContext, useEffect, useState } from "react";
import { Radio, Button, Card, Input, message } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { QuizAPI } from "../../../../api/QuizAPI";
import { contentContext } from "../../../../context/contentContext";
import { AuthContext } from "../../../../context/AuthContext";

interface QuizInterface {
    QuizName: string;
    Questions: {
        QuestionType: string;
        Question: string;
        Answers: {
            Correct: string[];
            Incorrect: string[];
        }
    }[];
}

function Edit_Quiz() {

    const [quiz, setQuiz] = useState<QuizInterface | null>({ QuizName: "", Questions: [] });
    const [questionInputs, setQuestionInputs] = useState<string[]>([]);
    const { contentID, courseName } = useContext(contentContext);
    const { user, setEditCourseContext } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      console.log(contentID)
        const fetchQuiz = async () => {
            try {
                const data = await QuizAPI.getQuiz(contentID);
                const parsedData = JSON.parse(data.Quiz_JSON);
                console.log(parsedData)
                setQuiz(parsedData);
                const inputs: string[] = [];
                parsedData.Questions.forEach((question: { Question: string; Answers: { Correct: any; Incorrect: any; }; }) => {
                    inputs.push(question.Question, ...question.Answers.Correct, ...question.Answers.Incorrect);
                });
                setQuestionInputs(inputs);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch quiz:", error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [contentID]);

    const handleQuestionInputChange = (index: number, value: string) => {
        const updatedInputs = [...questionInputs];
        updatedInputs[index] = value;
        setQuestionInputs(updatedInputs);
        setQuiz(prevState => {
            if (!prevState) return prevState;
            const questionIndex = Math.floor(index / 5); // Calculate the question index
            const answerIndex = index % 5; // Calculate the answer index
            const updatedQuestions = [...prevState.Questions];
            if (answerIndex === 0) {
                updatedQuestions[questionIndex].Question = value; // Update the question text
            } else if (answerIndex === 1) {
                updatedQuestions[questionIndex].Answers.Correct = [value]; // Update the correct answer
            } else {
                updatedQuestions[questionIndex].Answers.Incorrect[answerIndex - 2] = value; // Update the incorrect answers
            }
            return {
                ...prevState,
                Questions: updatedQuestions
            };
        });
    }

    const saveQuiz = async () => {
        console.log("Save Quiz clicked");
        if (!quiz) return;
        try {
            await QuizAPI.updateQuiz(quiz, contentID);
            message.success('Quiz updated successfully');
            setTimeout(() => {
                setEditCourseContext('Edit_Course');
            }, 500);
        } catch (error) {
            console.error("Failed to save quiz:", error);
            message.error('Failed to save quiz');
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card>
              <Input placeholder="Quiz Name" value={quiz?.QuizName} onChange={(e) => setQuiz(prevState => ({ ...prevState, QuizName: e.target.value, Questions: prevState?.Questions || [] }))} />
            </Card>
            {quiz && quiz.Questions.map((question, index) => (
                <div key={index}>
                    <Card title={`Question ${index + 1}`}>
                        <Input placeholder="Question" value={questionInputs[index * 5]} onChange={(e) => handleQuestionInputChange(index * 5, e.target.value)} />
                        <Input placeholder="Correct Answer" value={questionInputs[index * 5 + 1]} onChange={(e) => handleQuestionInputChange(index * 5 + 1, e.target.value)} />
                        <Input placeholder="Incorrect Answer" value={questionInputs[index * 5 + 2]} onChange={(e) => handleQuestionInputChange(index * 5 + 2, e.target.value)} />
                        <Input placeholder="Incorrect Answer" value={questionInputs[index * 5 + 3]} onChange={(e) => handleQuestionInputChange(index * 5 + 3, e.target.value)} />
                        <Input placeholder="Incorrect Answer" value={questionInputs[index * 5 + 4]} onChange={(e) => handleQuestionInputChange(index * 5 + 4, e.target.value)} />
                    </Card>
                </div>
            ))}
            <div>
                <Button onClick={saveQuiz}>Save</Button>
            </div>
        </div>
    );
}

export default Edit_Quiz;
