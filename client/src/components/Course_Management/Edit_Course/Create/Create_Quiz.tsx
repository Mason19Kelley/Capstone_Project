//imports
import React, { useState } from 'react';
import { Card, Button, Input, message } from 'antd';
import { QuizAPI } from '../../../../api/QuizAPI';
import { useContext } from 'react';
import { contentContext } from '../../../../context/contentContext';
import { AuthContext } from '../../../../context/AuthContext';

// interface for quiz json
interface QuizInterface {
    QuizName: string;
    QuizID: string;
    Questions: {
        QuestionType: string;
        Question: string;
        Answers: {
            Correct: string[];
            Incorrect: string[];
        }
    }[];
    Description: string;
}

const CreateQuiz: React.FC = () => {
    const [quiz, setQuiz] = useState<QuizInterface | null>({ QuizName: "Test Quiz", QuizID: '', Questions: [], Description: ''});
    const [questionInputs, setQuestionInputs] = useState<string[]>(['']);
    const { contentID, courseName } = useContext(contentContext);
    const {user,  setEditCourseContext } = useContext(AuthContext)
    const [description, setDescription] = useState<string>('');

    const addQuestion = () => {
        
        // Create a new question object
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
        try {
            console.log(description);
            if (description !== '') {
                QuizAPI.saveQuiz(quiz, courseName, contentID, user?.organization?.id ?? 0, description);
                message.success('Quiz saved successfully');
                setTimeout(() => {
                    setEditCourseContext('Edit_Course');
                }, 500);
            }else{
                message.error('Please enter a description');
            }
        }
        catch (error) {
            message.error('Failed to save quiz');
        }
    }

    const deleteQuestion = (index: number) => {
        setQuiz(prevState => {
            if (!prevState) return prevState;
            const updatedQuestions = prevState.Questions.filter((_, i) => i !== index);
            return {
                ...prevState,
                Questions: updatedQuestions
            };
        });
        setQuestionInputs(prevInputs => {
            const updatedInputs = [...prevInputs];
            updatedInputs.splice(index * 5, 5);
            return updatedInputs;
        });
    }
    

    return (
        <div>
            <Card style={{ marginBottom: 10, background: '#D0E2F0', borderBlockWidth: '1vw', borderBlockColor: '#B1D0E7',}}>
                <div className='flex flex-col'>
                    <span style={{fontFamily: 'Oswald', fontSize: '1.6em', marginBottom: '2%'}} className='font-semibold text-base text-start w-[100%]'>Quiz Title</span>
                <Input 
                placeholder="Quiz Name" 
                value={quiz?.QuizName} 
                onChange={(e) => setQuiz((prevState: QuizInterface | null) => ({ ...prevState!, QuizName: e.target.value, QuizID: '', Questions: prevState?.Questions || [], Description: description }))} 
                />
                <span style={{fontFamily: 'Oswald', fontSize: '1.6em', marginBottom: '2%', marginTop: '2%'}} className='font-semibold text-base text-start w-[100%]'>Description</span>
                <Input 
                        placeholder="Description" 
                        allowClear 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                </Input>
                </div>
            </Card>
            {quiz && quiz.Questions.map((_question, index) => (
                <div key={index}>
                    <Card style={{marginBottom: 10, borderBlockWidth: '1vw', borderBlockColor: '#ECECEC', background: '#F5F5F5' }}
                     title=<span style={{fontFamily: 'Oswald', fontSize: '1.5em'}}>{`Question ${index + 1}`}</span>>
                        <Input style={{marginBottom: 15, height: '3em'}} placeholder="Question" value={questionInputs[index * 5]} onChange={(e) => handleQuestionInputChange(index * 5, e.target.value)} />
                        <Input style={{marginBottom: 3}} placeholder="Correct Answer" value={questionInputs[index * 5 + 1]} onChange={(e) => handleQuestionInputChange(index * 5 + 1, e.target.value)} />
                        <Input style={{marginBottom: 3}} placeholder="Incorrect Answer" value={questionInputs[index * 5 + 2]} onChange={(e) => handleQuestionInputChange(index * 5 + 2, e.target.value)} />
                        <Input style={{marginBottom: 3}} placeholder="Incorrect Answer" value={questionInputs[index * 5 + 3]} onChange={(e) => handleQuestionInputChange(index * 5 + 3, e.target.value)} />
                        <Input style={{marginBottom: 15}} placeholder="Incorrect Answer" value={questionInputs[index * 5 + 4]} onChange={(e) => handleQuestionInputChange(index * 5 + 4, e.target.value)} />
                        <Button style={{background: '#F34B4B', color: 'white'}} onClick={() => deleteQuestion(index)}>Delete</Button>
                    </Card>
                </div>
            ))}

            <div style={{marginBottom: -60, marginTop: -40}}>
            <Button style={{background: '#F34B4B', color: 'white'}} onClick={addQuestion}>Add Question</Button>
            </div><div>
                <Button style={{background: '#F34B4B', color: 'white'}} onClick={saveQuiz}>Save</Button>
            </div>
        </div>
    );
}

export default CreateQuiz;
