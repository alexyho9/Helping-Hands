import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import UpdateUsersModal from "./UpdateUsersModal";

function AdminUsers() {
  const { token, fetchWithToken } = useToken();
  const [users, setusers] = useState([]);
  const [showUpdateUsersModal, setShowUpdateUsersModal] = useState(false);
  const [currentuserUsername, setCurrentuserUsername] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (token && isAdmin()) {
      fetchusers();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchusers = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/users/`;
    try {
      const data = await fetchWithToken(url);
      setusers(data);
    } catch (error) {}
  };

  const handleDelete = async (username) => {
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/users/${username}/`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      const updatedusers = users.filter((user) => user.username !== username);
      setusers(updatedusers);
    }
  };

  return (
    <div className="table table-striped">
      <div id="top-bar">
        <div id="logo">Helping Hands</div>
      </div>
      <main>
        <table className="admin-table">
          <thead>
            <tr>
              <th>user ID</th>
              <th>Frist Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "12px",
                      padding: "8px",
                    }}
                    name="Delete"
                    color="red"
                    className="btn btn-primary"
                    onClick={() => handleDelete(user.username)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "12px",
                      padding: "8px",
                    }}
                    name="Update"
                    color="red"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowUpdateUsersModal(true);
                      setCurrentuserUsername(user.username);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateUsersModal && (
          <UpdateUsersModal
            initialUsername={currentuserUsername}
            closeModal={() => setShowUpdateUsersModal(false)}
            afterUpdate={() => {
              setShowUpdateUsersModal(false);
              navigate("/admin/users");
            }}
          />
        )}
      </main>
    </div>
  );
}
export default AdminUsers;
