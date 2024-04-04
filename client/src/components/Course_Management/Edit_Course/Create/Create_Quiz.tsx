import React, { useEffect, useState } from 'react';
import { Card, Button, Input, message } from 'antd';
import { QuizAPI } from '../../../../api/QuizAPI';
import { useContext } from 'react';
import { contentContext } from '../../../../context/contentContext';
import { AuthContext } from '../../../../context/AuthContext';

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

const CreateQuiz: React.FC = () => {
    const [quiz, setQuiz] = useState<QuizInterface | null>({ QuizName: "Test Quiz", Questions: [] });
    const [questionInputs, setQuestionInputs] = useState<string[]>(['']);
    const { contentID, courseName } = useContext(contentContext);
    const {user} = useContext(AuthContext)


    const addQuestion = () => {
        // Extract question and answers from the inputs
        const newQuestion = {
            QuestionType: "Multiple Choice",
            Question: questionInputs[(quiz?.Questions.length || 0) * 5],
            Answers: {
                Correct: [
                    questionInputs[(quiz?.Questions.length || 0) * 5 + 1],
                ],
                Incorrect: [
                    questionInputs[(quiz?.Questions.length || 0) * 5 + 2],
                    questionInputs[(quiz?.Questions.length || 0) * 5 + 3],
                    questionInputs[(quiz?.Questions.length || 0) * 5 + 4],
                ]
            }
        };

        // Update quiz state with the new question
        setQuiz(prevState => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                Questions: [...prevState.Questions, newQuestion]
            };
        });

        // Clear question inputs
        setQuestionInputs(prevState => [...prevState, '', '', '', '', '']);
    }

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

    const saveQuiz = () => {
        console.log("Save Quiz clicked");
        if (!quiz) return;
        // Call your API function here with the quiz state
        QuizAPI.saveQuiz(quiz, courseName, contentID, user?.organization?.id ?? 0);
        message.success('Quiz saved successfully');
    }

    return (
        <div>
            <Card>
                <Input placeholder="Quiz Name" value={quiz?.QuizName} onChange={(e) => setQuiz(prevState => ({ ...prevState, QuizName: e.target.value, Questions: [] }))} />
                <Button onClick={addQuestion}>Add Question</Button>
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

export default CreateQuiz;
