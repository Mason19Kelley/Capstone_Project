import { api } from "./axiosConfig";

export const CreateOrgAPI = {

    createOrg: async (adminUsername: string, password: string, email: string, organization: string, adminName: string) => {
        const { data } = await api.post("/createOrg/insertOrg", {
            username: adminUsername,
            password: password,
            email: email,
            organization: organization,
            adminName: adminName,
            role: "Administrator"
            }
        );
        //console.log(data)
        return data;
    }
}