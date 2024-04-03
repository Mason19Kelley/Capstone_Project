import { api } from "./axiosConfig"

export const CourseAPI = {

    getCourses: async (userId: number) => {
        const { data } = await api.get(`/courses/getCourses/${userId}`);
        return data
    },

    getOneCourse: async (course: string, org: number) => {
        const { data } = await api.get(`/courses/getOneCourse/${course}/${org}`);
        return data
    },

    getUsersInCourse: async (course: string) => {
        const { data } = await api.get(`/courses/getUsersInCourse/${course}`);
        return data
    },

    addUserstoCourse: async (course: string, userIds: number[]) => {
        const { data } = await api.post(`/users/addUsersToCourse/${course}`, {userIds: userIds});
        return data
    },

    insertUser: async (cid: number, uid: number) => {
        const { data } = await api.post(`/users/insertUser/${cid}/${uid}`);
        return data
    },

    deleteUser: async (cid: number, uid: number) => {

        const { data } = await api.delete(`/users/deleteUserInCourse/${cid}/${uid}`);
        return data
    },

    getCoursesFromUser: async (uid: number) => {
        const { data } = await api.get(`/users/getCourses/${uid}`);
        return data 
    },

    //used to insert a course with appropriate information: course Name, JSON, instructor Name, and organization ID
    insertCourse: async (course: string, jsonInformation: string, instructor: string, organization: number | undefined) => {
        const { data } = await api.post(`/courses/insertCourse/${course}/${jsonInformation}/${instructor}/${organization}`);
        return data
    },

    //used to get all courses based on organization ID
    getAllCourses: async (org_ID: number) => {
        const { data } = await api.get(`/courses/getAllCourses/${org_ID}`);
        return data
    },

    //used to a delete course
    deleteCourse: async (course: string) => {
        const { data } = await api.post(`/courses/deleteCourse/${course}`);
        return data
    },

    //used to update course name and instructor
    updateCourse: async (courseName: string, oldCourseName:string, instructor: string, oldInstructorName: string) => {
        const { data } = await api.post(`/courses/updateCourse/${courseName}/${oldCourseName}/${instructor}/${oldInstructorName}`);
        return data
    },
    

    updateCourseJSON: async (courseName: string, courseJSON: any) => {
  
        const { data } = await api.post(`/courses/updateCourseJSON/${courseName}`, courseJSON);
        return data;
    },

    getCourseCompletion: async (userId: number, courseId: number) => {
        const { data } = await api.get(`courses/getCourseCompletion/${userId}/${courseId}`)
        return data
    },

    updateCourseCompletion: async (userId: number, courseId: number, moduleCompleted: number, contentCompleted: number) => {
        const { data } = await api.post(`courses/updateCourseCompletion/${userId}/${courseId}`, {moduleCompleted, contentCompleted})
        return data
    }
}