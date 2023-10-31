import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UpdateUsersModal({ initialUsername, closeModal, afterUpdate }) {
  const { token } = useToken();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [newusername, setNewUsername] = useState(initialUsername);
  const [username] = useState(initialUsername);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const isAdmin = () => {
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.account && payload.account.role === "admin";
    } catch (e) {
      return false;
    }
  };
  const handleSubmit = async (user) => {
    user.preventDefault();

    if (!isAdmin()) {
      alert("Only admin users can update users.");
      return;
    }

    const data = {
      first_name,
      last_name,
      username: newusername,
      email,
      password,
      role,
    };

    const usersUrl = `${process.env.REACT_APP_API_HOST}/api/users/${username}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(usersUrl, fetchConfig);
      if (response.ok) {
        closeModal();
        afterUpdate();
        window.location.reload();
      } else {
        alert("Failed to update the user. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      {isAdmin ? (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Update A user</h1>
              <form onSubmit={handleSubmit} id="update-user-form">
                <div className="form-floating mb-3">
                  <input
                    value={first_name}
                    onChange={handleFirstNameChange}
                    placeholder="first_name"
                    required
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                  />
                  <label htmlFor="user_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={last_name}
                    onChange={handleLastNameChange}
                    placeholder="last_name"
                    required
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                  />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={newusername}
                    onChange={handleUsernameChange}
                    placeholder="username"
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                  />
                  <label htmlFor="username">user username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="password"
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <label htmlFor="username">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="email"
                    required
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                  <label htmlFor="username">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={role}
                    onChange={handleRoleChange}
                    placeholder="role"
                    required
                    type="text"
                    name="role"
                    id="capaciy"
                    className="form-control"
                  />
                  <label htmlFor="role">role</label>
                </div>
                <div>
                  <button className="btn btn-success">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>You don't have the permissions to access this page.</p>
      )}
    </div>
  );
}

export default UpdateUsersModal;
