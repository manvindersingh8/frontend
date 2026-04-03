import { useDispatch } from "react-redux";

import { API } from "../services/axios";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await API.post("/auth/login", data);
      dispatch(setUser(result.data.data));
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };
  return { handleLogin };
};
