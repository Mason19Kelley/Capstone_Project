import { User } from "./user.model";

export interface CourseCompletionResponse {
    user: User;
    completions: Completion[];
}

export interface Completion {
    contentCompleted: number;
    courseId: number;
    moduleCompleted: number;
    userId: number;
}