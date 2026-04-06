import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { API } from "../services/axios";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const result = await API.get("/users/me");

        dispatch(setUser({ user: result.data.data }));
      } catch (error) {
        console.log("User not authenticated", error);
      } finally {
        setLoading(false);
      }
    };

    rehydrate();
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>;

  return children;
};

export default AuthProvider;
