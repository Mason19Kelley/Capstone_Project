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
    Description: string;
}

function Edit_Quiz() {

    // variables
    const [quiz, setQuiz] = useState<QuizInterface | null>({ QuizName: "", Questions: [], Description: ""});
    const [questionInputs, setQuestionInputs] = useState<string[]>([]);
    const { contentID } = useContext(contentContext);
    const { setEditCourseContext } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');

    // fetch quiz from api
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await QuizAPI.getQuiz(contentID);

                // parse the json to be usable 
                const parsedData = JSON.parse(data.Quiz_JSON);
                setQuiz(parsedData);
                setDescription(parsedData.Description);

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
            <Card>
              <Input placeholder="Quiz Name" value={quiz?.QuizName} onChange={(e) => setQuiz(prevState => ({ ...prevState, QuizName: e.target.value, Questions: prevState?.Questions || [], Description: description }))} />
              <Button onClick={addQuestion}>Add Question</Button>
            </Card>
            {quiz && quiz.Questions.map((_question, index) => (
                <div key={index}>
                    <Card title={`Question ${index + 1}`}>
                        <Input placeholder="Question" value={questionInputs[index * 5]} onChange={(e) => handleQuestionInputChange(index * 5, e.target.value)} />
                        <Input placeholder="Correct Answer" value={questionInputs[index * 5 + 1]} onChange={(e) => handleQuestionInputChange(index * 5 + 1, e.target.value)} />
                        <Input placeholder="Incorrect Answer" value={questionInputs[index * 5 + 2]} onChange={(e) => handleQuestionInputChange(index * 5 + 2, e.target.value)} />
                        <Input placeholder="Incorrect Answer" value={questionInputs[index * 5 + 3]} onChange={(e) => handleQuestionInputChange(index * 5 + 3, e.target.value)} />
                        <Input placeholder="Incorrect Answer" value={questionInputs[index * 5 + 4]} onChange={(e) => handleQuestionInputChange(index * 5 + 4, e.target.value)} />
                        <Button onClick={() => deleteQuestion(index)}>Delete Question</Button>
                    </Card>
                </div>
            ))}
            <div>

            <Card>
                    Description: 
                    <Input 
                        placeholder="Description" 
                        allowClear 
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setQuiz((prevState: QuizInterface | null) => ({
                                ...prevState!,
                                Description: e.target.value,
                                QuizName: prevState?.QuizName || '', // Ensure QuizName is included
                            }));
                        }}
                    />
                </Card>
                <Button onClick={saveQuiz}>Save</Button>
            </div>
        </div>
    );
}

export default Edit_Quiz;
