import { Organization } from "../models/organization.model";
import { UserTable } from "../models/userTable.model";
import { api } from "./axiosConfig";

export const AdminAPI = {
    getUsersByOrg: async (orgId: number | undefined) => {
        if(orgId === undefined){
            return
        }
        console.log(api.defaults)
      const { data } = await api.get(`/users/getUsersByOrg/${orgId}`);
      return data
    },

    updateOrgName: async (newOrgName: Organization) => {
        const { data } = await api.post(`/organizations/renameOrg`, newOrgName)
        return data
    },

    deleteUser: async (userId: number | undefined) => {
        if(userId === undefined){
            return
        }
        const { data } = await api.delete(`/users/deleteUser/${userId}`)
        return data
    },

    updateUser: async (user: UserTable) => {
        const { data } = await api.post(`/users/updateUser`, user)
        return data
    }


}