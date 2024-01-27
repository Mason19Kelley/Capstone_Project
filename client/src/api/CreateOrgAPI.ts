import { api } from "./axiosConfig";

export const CreateOrgAPI = {

    createOrg: async (adminUsername: string, password: string, orgName: string, adminName: string, adminEmail: string) => {
        const { data } = await api.post("/createOrg/insertOrg", {
            username: adminUsername,
            password: password,
            email: adminEmail,
            orgName: orgName,
            adminName: adminName
            }
        );
        console.log(data)
    }
}