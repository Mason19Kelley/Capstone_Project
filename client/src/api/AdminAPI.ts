import { api } from "./axiosConfig";
// login functions
export const AdminAPI = {
    getUsersByOrg: async (orgId: number | undefined) => {
        if(orgId === undefined){
            return
        }
      const { data } = await api.get(`/users/getUsersByOrg/${orgId}`);
      return data
    }

}