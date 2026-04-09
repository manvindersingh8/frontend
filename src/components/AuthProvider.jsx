import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../store/authSlice";
import { API } from "../services/axios";
import Spinner from "@/styles/spinner";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const result = await API.get("/users/me");
        const userData = result.data.data;

        dispatch(setUser({ user: userData, role: userData.role }));
      } catch (error) {
        console.error("User not authenticated", error);

        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    rehydrate();
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );

  return children;
};

export default AuthProvider;
