import { api } from "./axiosConfig"

export const CourseAPI = {

    getCourses: async (userId: number) => {
        const { data } = await api.get(`/courses/getCourses/${userId}`);
        console.log(data);
        return data
    },

    insertUser: async (cid: number, uid: number) => {
        //console.log(cid)
        const { data } = await api.post(`/users/insertUser/${cid}/${uid}`);
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
        //console.log(data);
        return data 
    }
}