import axios from "axios";
import { loginData } from "@/store/features/auth/authTypes";

export const loginApi = async ({ email, password }: loginData) => {
  const res = await axios.post("https://deploy-backend-h9zt.onrender.com/api/auth/login", {
    email,
    password,
  });

  return res.data;
};
