import { api } from "./axiosConfig";

export const FileAPI = {
    getFile: async (fileName: string) => {
      const { data } = await api.get(`/file/getFile/${fileName}`, {
        responseType: 'blob',
      });
      return data
    },

    uploadFile: async(file: FormData) => {
      const { data } = await api.post('/file/uploadFile', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data)
    },

    deleteFile: async (fileName: string) => {
      const { data } = await api.post(`/file/deleteFile/${fileName}`);
      return data
    }
    


}