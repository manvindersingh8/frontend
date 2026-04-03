import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../services/axios";
import { logout } from "../store/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }
    dispatch(logout());
    navigate("/login");
  };
  return { handleLogout };
};
