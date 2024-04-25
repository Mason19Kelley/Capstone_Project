//imports
import { useContext, useEffect, useState } from "react";
import { Button, Card, Input, message } from "antd";
import { QuizAPI } from "../../../../api/QuizAPI";
import { contentContext } from "../../../../context/contentContext";
import { AuthContext } from "../../../../context/AuthContext";

// interface for quiz json
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

    // variables
    const [quiz, setQuiz] = useState<QuizInterface | null>({ QuizName: "", Questions: [] });
    const [questionInputs, setQuestionInputs] = useState<string[]>([]);
    const { contentID } = useContext(contentContext);
    const { setEditCourseContext } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);

    // fetch quiz from api
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await QuizAPI.getQuiz(contentID);

                // parse the json to be usable 
                const parsedData = JSON.parse(data.Quiz_JSON);
                setQuiz(parsedData);

                // get the questions and answers
                const inputs: string[] = [];
                parsedData.Questions.forEach((question: { Question: string; Answers: { Correct: any; Incorrect: any; }; }) => {
                    inputs.push(question.Question, ...question.Answers.Correct, ...question.Answers.Incorrect);
                });
                setQuestionInputs(inputs);
                setLoading(false);
            // catch errors
            } catch (error) {
                console.error("Failed to fetch quiz:", error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [contentID]);

    // handle question input change
    // This function is used to handle if the question input is changed
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

    // Adds the ability to add a new question
    const addQuestion = () => {
        setQuiz(prevState => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                Questions: [
                    ...prevState.Questions,
                    {
                        QuestionType: "", // Set appropriate type
                        Question: "",
                        Answers: {
                            Correct: [],
                            Incorrect: []
                        }
                    }
                ]
            };
        });
        const emptyInputs = ["", "", "", "", ""]; // 5 empty inputs for each new question
        setQuestionInputs(prevInputs => [...prevInputs, ...emptyInputs]);
    }

    // Deletes a question from the quiz json
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

    // Saves quiz and sends updated information to the api
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
            <Card style={{ marginBottom: 10, background: '#D0E2F0', borderBlockWidth: '1vw', borderBlockColor: '#B1D0E7',}}>
                <div className='flex flex-col'>
                    <span style={{fontFamily: 'Oswald', fontSize: '1.6em', marginBottom: '2%'}} className='font-semibold text-base text-start w-[100%]'>Quiz Title</span>
                    <Input placeholder="Quiz Name" value={quiz?.QuizName} onChange={(e) => setQuiz(prevState => ({ ...prevState, QuizName: e.target.value, Questions: prevState?.Questions || [] }))} />
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
                        <Button style={{background: '#F34B4B', color: 'white'}} onClick={() => deleteQuestion(index)}>Delete Question</Button>
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

export default Edit_Quiz;
