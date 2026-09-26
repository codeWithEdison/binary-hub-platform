import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Legacy demo login — always redirect to real auth. */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate("/auth", { replace: true, state: location.state });
  }, [navigate, location.state]);

  return null;
};

export default Login;
