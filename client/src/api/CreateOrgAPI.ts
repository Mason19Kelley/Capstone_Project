import { api } from "./axiosConfig";

export const CreateOrgAPI = {

    createOrg: async (adminUsername: string, password: string, email: string, organization: string) => {
        const { data } = await api.post("/createOrg/insertOrg", {
            username: adminUsername,
            password: password,
            email: email,
            organization: organization,
            role: "Systems Admin"
            }
        );
        //console.log(data)
        return data;
    }
}