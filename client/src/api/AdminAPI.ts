import { Organization } from "../models/organization.model";
import { CreateUserArgs } from "../models/user.model";
import { UserTable } from "../models/userTable.model";
import { api } from "./axiosConfig";

export const AdminAPI = {
    getUsersByOrg: async (orgId: number | undefined) => {
        if(orgId === undefined){
            return
        }
      const { data } = await api.get(`/users/getUsersByOrg/${orgId}`);
      return data
    },

    getAdminByOrg: async (orgId: number | undefined) => {
        if(orgId === undefined){
            return
        }
        const { data } = await api.get(`/users/getAdminByOrg/${orgId}`);
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
    },

    pullLogs: async () => {
        const { data } = await api.get(`/auth/getLogs`)
        return data
      },

    createUser: async (createUserArgs: CreateUserArgs) => {
    const { data } = await api.post(`/auth/createUser`, createUserArgs)
    return data
    },


}