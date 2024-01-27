import { api } from "./axiosConfig";

export const CreateOrgAPI = {

    createOrg: async (adminUsername: string, password: string, orgName: string, adminName: string, adminEmail: string) => {
        const { data } = await api.post("/createOrg/insert", {
            adminUsername: adminUsername,
            password: password,
            orgName: orgName,
            adminName: adminName,
            adminEmail: adminEmail
          });
          console.log(data)
    }
}