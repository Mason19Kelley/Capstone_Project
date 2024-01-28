import { api } from "./axiosConfig";

export const CreateOrgAPI = {

    createOrg: async (adminUsername: string, password: string, email: string, orgName: string, adminName: string) => {
        const { data } = await api.post("/createOrg/insertOrg", {
            username: adminUsername,
            password: password,
            email: email,
            orgName: orgName,
            adminName: adminName,
            role: "Administrator"
            }
        );
        //console.log(data)
        return data;
    }
}