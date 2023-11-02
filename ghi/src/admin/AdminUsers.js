import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import UpdateUsersModal from "./UpdateUsersModal";
import { Link } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./styling/ButtonStyling.css";

function AdminUsers() {
  const { token, fetchWithToken } = useToken();
  const [users, setusers] = useState([]);
  const [showUpdateUsersModal, setShowUpdateUsersModal] = useState(false);
  const [currentuserUsername, setCurrentuserUsername] = useState(null);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

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
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table">
      <div id="top-bar">
        <h1 className="header">USERS</h1>
      </div>
      <main>
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort("id")}>user ID</th>
              <th onClick={() => handleSort("first_name")}>Frist Name</th>
              <th onClick={() => handleSort("last_name")}>Last Name</th>
              <th onClick={() => handleSort("username")}>Username</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th onClick={() => handleSort("role")}>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice()
              .sort((a, b) => {
                if (sortConfig.key === "id") {
                  return sortConfig.direction === "ascending"
                    ? a.id - b.id
                    : b.id - a.id;
                }
                if (sortConfig.key === "date") {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  return sortConfig.direction === "ascending"
                    ? dateA - dateB
                    : dateB - dateA;
                }
                if (a[sortConfig.key] < b[sortConfig.key]) {
                  return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                  return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
              })
              .map((user) => (
                <React.Fragment key={user.id}></React.Fragment>
              ))}
            {users.map((user) => (
              <tr key={user.id}>
                <td></td>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div
                    className="update-btn"
                    onClick={() => {
                      setShowUpdateUsersModal(true);
                      setCurrentuserUsername(user.username);
                    }}
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
                </td>
                <td>
                  <div
                    className="delete-btn"
                    onClick={() => handleDelete(user.username)}
                  >
                    <div className="qube">
                      <div className="front">Delete</div>
                      <div className="back">
                        <Link>
                          <DeleteForeverIcon
                            style={{ fontSize: 50, color: "red" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
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
