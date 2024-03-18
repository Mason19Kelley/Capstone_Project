import { api } from "./axiosConfig";

export const FileAPI = {
    getFile: async (fileName: string) => {
      const { data } = await api.get(`/file/getFile/${fileName}`, {
        responseType: 'blob',
      });
      return data
    },

    uploadFile: async(file: FormData) => {
      const { data } = await api.post('http://localhost:3000/file/uploadFile', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data)
    }

    


}