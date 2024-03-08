import { api } from "./axiosConfig"

export const CourseAPI = {

    getCourses: async (userId: number) => {
        const { data } = await api.get(`/courses/getCourses/${userId}`);
        console.log(data);
        return data
    },

    getOneCourse: async (course: string, org: string) => {
        const { data } = await api.get(`/courses/getOneCourse/${course}/${org}`);
        console.log(data);
        return data
    },

    insertUser: async (cid: number, uid: number) => {
        console.log('cid',cid)
        console.log('uid', uid)
        const { data } = await api.post(`/users/insertUser/${cid}/${uid}`);
        console.log('data')
        console.log(data);
        return data
    },

    deleteUser: async (cid: number, uid: number) => {
        //console.log(cid)
        const { data } = await api.delete(`/users/deleteUserInCourse/${cid}/${uid}`);
        console.log(data);
        return data
    },

    getCoursesFromUser: async (uid: number) => {
        const { data } = await api.get(`/users/getCourses/${uid}`);
        console.log('here')
        console.log(data);
        return data 
    },

    insertCourse: async (course: string, jsonInformation: string, instructor: string, organization: string) => {
        const { data } = await api.post(`/courses/insertCourse/${course}/${jsonInformation}/${instructor}/${organization}`);
        console.log(data);
        return data
    },

    getAllCourses: async () => {
        const { data } = await api.get(`/courses/getAllCourses`);
        console.log(data);
        return data
    },

    deleteCourse: async (course: string) => {
        const { data } = await api.post(`/courses/deleteCourse/${course}`);
        console.log(data);
        return data
    }
}