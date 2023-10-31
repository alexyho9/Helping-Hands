import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateAdmin = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("");
  const [admin_token, setAdmin_token] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      role: role,
      admin_token: admin_token,
    };

    const url = `${process.env.REACT_APP_API_HOST}/api/users/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setfirst_name("");
      setlast_name("");
      setusername("");
      setpassword("");
      setRole("");
      setAdmin_token("");
      navigate("/admin/users");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a New Admin</h1>
          <form onSubmit={handleSubmit} id="create-admin-form">
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setfirst_name(e.target.value)}
                placeholder="first_name"
                required
                type="text"
                name="first_name"
                id="first_name"
                value={first_name}
                className="form-control"
              />
              <label htmlFor="first_name">first_name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setlast_name(e.target.value)}
                placeholder="last_name"
                required
                type="last_name"
                name="last_name"
                id="last_name"
                value={last_name}
                className="form-control"
              />
              <label htmlFor="last_name">last_name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setusername(e.target.value)}
                placeholder="username"
                type="text"
                name="username"
                id="username"
                value={username}
                className="form-control"
              />
              <label htmlFor="username">username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Image URL"
                type="text"
                name="password"
                id="password"
                value={password}
                className="form-control"
              />
              <label htmlFor="password">Image URL</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setemail(e.target.value)}
                placeholder="email"
                required
                type="text"
                name="email"
                id="email"
                value={email}
                className="form-control"
              />
              <label htmlFor="email">email</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
