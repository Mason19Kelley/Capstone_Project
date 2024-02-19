import { Organization } from "../models/organization.model";
import { UserTable } from "../models/userTable.model";
import { api } from "./axiosConfig";

export const FileAPI = {
    getFile: async (fileName: string) => {
      const { data } = await api.get(`/file/getFile/${fileName}`, {
        responseType: 'blob',
      });
      return data
    },

    


}