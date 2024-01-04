import { api } from "./axiosConfig";
// login functions
export const AuthAPI = {
    // logs in using credentials
    login: async (username: string, password: string) => {
        const { data } = await api.post("/auth/login", {
            username: username,
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
    }
}