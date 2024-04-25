import { api } from "./axiosConfig";

interface Quiz {
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

export const QuizAPI = {
    getQuiz: async ( quizId: string) => {
        const { data } = await api.get(`/quiz/getQuizById/${quizId}`);
        return data
    },

    saveQuiz: async (quiz: Quiz, courseName: string, moduleID: string, orgID: number, description: string) => {
        const { data } = await api.post(`quiz/saveQuiz/${courseName}/${moduleID}/${orgID}/${description}`, quiz);
        return data;
    },

    updateQuiz: async (quiz: Quiz, quizId: string) => {
        const { data } = await api.put(`quiz/updateQuiz/${quizId}`, quiz);
        return data;
    }
    
} 

