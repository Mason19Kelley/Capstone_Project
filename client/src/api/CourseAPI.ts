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

    insertCourse: async (course: string, jsonInformation: string, instructor: string, organization: number | undefined) => {
        const { data } = await api.post(`/courses/insertCourse/${course}/${jsonInformation}/${instructor}/${organization}`);
        return data
    },

    getAllCourses: async (org_ID: number) => {
        const { data } = await api.get(`/courses/getAllCourses/${org_ID}`);
        return data
    },

    deleteCourse: async (course: string) => {
        const { data } = await api.post(`/courses/deleteCourse/${course}`);
        return data
    },

    updateCourse: async (courseName: string, oldCourseName:string, instructor: string, oldInstructorName: string) => {
        const { data } = await api.post(`/courses/updateCourse/${courseName}/${oldCourseName}/${instructor}/${oldInstructorName}`);
        return data
    }
}