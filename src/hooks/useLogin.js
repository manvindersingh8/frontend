import { useDispatch } from "react-redux";
import { API } from "../services/axios";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // ✅ ADD THIS

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await API.post("/auth/login", data);

      const userData = result.data.data;

      dispatch(setUser(userData));

      // ✅ SUCCESS TOAST
      toast.success("Login successful 🎉");

      // ⏳ optional delay (better UX)
      setTimeout(() => {
        navigate("/jobs");
      }, 800);
    } catch (error) {
      console.log(error);

      // ❌ ERROR TOAST
      toast.error(
        error?.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return { handleLogin };
};
