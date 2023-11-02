import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import UpdateMealsModal from "./UpdateMealsModal";
import { useNavigate } from "react-router-dom";
import ReservationsSubMenu from "./ReservationsMenu";
import CollapsibleRow from "./styling/CollapsibleRow";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./styling/ButtonStyling.css";

function AdminMeals() {
  const { token, fetchWithToken } = useToken();
  const [meals, setMeals] = useState([]);
  const [showUpdateMealsModal, setShowUpdateMealsModal] = useState(false);
  const [currentMealId, setCurrentMealId] = useState(null);
  const [openSubMenuMealId, setOpenSubMenuMealId] = useState(null);
  const [reservationsCount, setReservationsCount] = useState({});
  const [checkedStates, setCheckedStates] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });
  const navigate = useNavigate();
  const isAdmin = () => {
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.account && payload.account.role === "admin";
    } catch (e) {
      console.error("Error parsing token:", e);
      return false;
    }
  };

  useEffect(() => {
    if (token && isAdmin()) {
      fetchMeals();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMeals = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/`;
    try {
      const data = await fetchWithToken(url);
      setMeals(data);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/meals/${id}/`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      setMeals(updatedMeals);
    }
  };

  const handleUpdate = (id) => {
    setShowUpdateMealsModal(true);
    setCurrentMealId(id);
  };
  const getReservations = async (mealId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/${mealId}/reservations/`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setReservationsCount((prevCount) => ({
          ...prevCount,
          [mealId]: data.length,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    meals.forEach((meal) => getReservations(meal.id));
  }, [meals]);

  const handleCollapseToggle = (mealId) => {
    // Toggle the open submenu
    if (openSubMenuMealId === mealId) {
      setOpenSubMenuMealId(null);
    } else {
      setOpenSubMenuMealId(mealId);
    }

    // Toggle the switch state
    setCheckedStates((prevStates) => ({
      ...prevStates,
      [mealId]: !prevStates[mealId],
    }));
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <div className="meals-background-image"></div>
      <div className="table">
        <div id="top-bar"></div>
        <h1 className="header">MEALS</h1>

        <main>
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <div className="reservations-btn">Reservations</div>
                </th>
                <th onClick={() => handleSort("id")}>Meal ID</th>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("title")}>Title</th>
                <th onClick={() => handleSort("Description")}>Description</th>
                <th onClick={() => handleSort("Image")}>Image</th>
                <th onClick={() => handleSort("Capacity")}>Capacity</th>
                <th></th>
                <th>
                  <div
                    className="create-btn"
                    onClick={() => {
                      navigate(`/meals/create`);
                    }}
                  >
                    <div className="qube">
                      <div className="front">Create</div>
                      <div className="back">
                        <RestaurantIcon
                          style={{ fontSize: 50, color: "green" }}
                        />
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {meals
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
                .map((meal) => (
                  <React.Fragment key={meal.id}>
                    <tr className="main-row">
                      <td>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!checkedStates[meal.id]}
                              onChange={() => handleCollapseToggle(meal.id)}
                              name={`your-unique-name-${meal.id}`}
                              id={`your-unique-id-${meal.id}`}
                            />
                          }
                          label=""
                        />
                      </td>
                      <td>{meal.id}</td>
                      <td>{meal.date}</td>
                      <td>{meal.title}</td>
                      <td>{meal.description}</td>
                      <td>
                        <img
                          src={meal.image_url}
                          alt={meal.title}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{`${reservationsCount[meal.id] || 0} / ${
                        meal.capacity
                      }`}</td>

                      <td>
                        <div
                          className="update-btn"
                          onClick={() => handleUpdate(meal.id)}
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
                          onClick={() => handleDelete(meal.id)}
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
                    {openSubMenuMealId === meal.id && (
                      <tr>
                        <td colSpan="10">
                          <CollapsibleRow
                            isOpen={
                              checkedStates[meal.id] &&
                              openSubMenuMealId === meal.id
                            }
                          >
                            <ReservationsSubMenu mealId={meal.id} />
                          </CollapsibleRow>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
          {showUpdateMealsModal && (
            <UpdateMealsModal
              mealId={currentMealId}
              closeModal={() => setShowUpdateMealsModal(false)}
              afterUpdate={() => {
                setShowUpdateMealsModal(false);
                navigate("/admin/meals");
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminMeals;
