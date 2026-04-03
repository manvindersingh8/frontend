import { Link } from "react-router-dom";

const AuthPage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};
export default AuthPage;
