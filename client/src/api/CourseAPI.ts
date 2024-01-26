import { api } from "./axiosConfig"

export const CourseAPI = {

    getCourses: async (userId: number) => {
        const { data } = await api.get(`/course/getCourses/${userId}`)
        return data
    }
}