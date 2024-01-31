import { api } from "./axiosConfig";

// login functions
export const AuthAPI = {
    // logs in using credentials
    login: async (email: string, password: string) => {
        const { data } = await api.post("/auth/login", {
            email: email,
            password: password
          });
        // sets auth token to jwt
        api.defaults.headers['Authorization'] = `Bearer ${data}`;
        return data;
      },
    // used to test that auth is working in app.tsx
    checkUser: async () => {
      const { data } = await api.get("/auth/profile");
      return data
    },

    getUser: async (id: number) => {
      const { data } = await api.get(`/users/getUser/${id}`)
      return data
    },

    requestPasswordReset: async (email: string) => {
      const { data } = await api.post("/auth/requestResetPassword", { email })
      return data
    },

    resetPassword: async(userId: string | null, token: string | null, password: string) => {
      if(userId === null || token === null){
        return
      }
      const { data } = await api.post("/auth/resetPassword", { 
        token: token,
        userId: userId,
        password: password
       })
      return data
    }
}