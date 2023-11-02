import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./styling/Modals.css";
import Input from "@mui/material/Input";
import UpdateIcon from "@mui/icons-material/Update";
import { Link } from "react-router-dom";

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
  const ariaLabel = { "aria-label": "Description" };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box
          className="modal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "10px solid #B8DBD9",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="container">
            {isAdmin ? (
              <div className="row">
                <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                    <h1>Update A User</h1>
                    <form
                      onSubmit={handleSubmit}
                      id="update-user-form"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="form-floating mb-3">
                        <Input
                          inputProps={ariaLabel}
                          value={first_name}
                          onChange={handleFirstNameChange}
                          placeholder="First Name"
                          required
                          type="text"
                          name="first_name"
                          id="first_name"
                          className="form-control"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <Input
                          value={last_name}
                          onChange={handleLastNameChange}
                          placeholder="Last Name"
                          required
                          type="text"
                          name="last_name"
                          id="last_name"
                          className="form-control"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <Input
                          value={newusername}
                          onChange={handleUsernameChange}
                          placeholder="Username"
                          required
                          type="text"
                          name="username"
                          id="username"
                          className="form-control"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <Input
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Password"
                          required
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <Input
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="Email"
                          required
                          type="text"
                          name="email"
                          id="email"
                          className="form-control"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <Input
                          value={role}
                          onChange={handleRoleChange}
                          placeholder="Role"
                          required
                          type="text"
                          name="role"
                          id="capaciy"
                          className="form-control"
                        />
                        <div
                          className="update-btn"
                          style={{
                            margin: "0 auto",
                          }}
                          onClick={handleSubmit}
                        >
                          <div className="qube">
                            <div className="front">Update</div>
                            <div className="back">
                              <Link>
                                <UpdateIcon
                                  style={{ fontSize: 50, color: "orange" }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <p>You don't have the permissions to access this page.</p>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default UpdateUsersModal;
