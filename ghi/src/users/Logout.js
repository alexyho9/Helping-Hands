import { useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";


export default function Logout() {
  const { logout, token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      logout();
    }
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [token, logout]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100%",
          padding: "1rem",
        }}
      >
        <h2>Logged out. Redirecting...</h2>
      </div>
    </div>
  );
}
