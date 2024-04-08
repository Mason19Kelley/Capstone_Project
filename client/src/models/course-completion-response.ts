import { User } from "./user.model";

export interface CourseCompletionResponse {
    user: User;
    completion: Completion[];
}

export interface Completion {
    contentCompleted: number;
    courseId: number;
    moduleCompleted: number;
    userId: number;
    courseName: string;
    totalModules: number;
    totalContent: number;
    completed: boolean;
}