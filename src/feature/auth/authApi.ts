import { api } from "@/helper";
import { LoginCredentials, SignuCredentials } from "./authInterface";
  export const loginApi = async (credentials: LoginCredentials) => {
    const {data} = await api.post('/auth/login', credentials)
    console.log(data)
    return {data}
    
  };
  
  export const signupApi = async (data: SignuCredentials) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  };
  
 
  