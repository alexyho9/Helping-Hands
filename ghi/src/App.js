import { useEffect, useState } from "react";
import "./App.css";
import ListEvents from "./events/ListEvents.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetails from "./events/EventDetails";
import CreateEvent from "./events/CreateEvent";
import ListUserEvents from "./user_events/ListUserEvents";
import ListMeals from "./meals/ListMeals";
import CreateMeal from "./meals/CreateMeal";
import LoginForm from "./users/LoginForm";
import SignupForm from "./users/SignUpForm";

function App() {
  const [userId, setUserId] = useState("");
  const { fetchWithToken, token } = useToken();
  const getAccountData = async () => {
    if (token) {
      const response = await fetchWithToken(
        `${process.env.REACT_APP_API_HOST}/api/userdata`
      );
      setUserId(response["id"]);
    } else {
      setUserId(null);
    }
  };
  useEffect(() => {
    getAccountData();
  }, [token]);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="events" element={<ListEvents />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="meals" element={<ListMeals />} />
          <Route path="meals/create" element={<CreateMeal />} />
          <Route path="signup" element={<SignupForm />} />
          <Route
            path="user/events"
            element={<ListUserEvents userId={userId} />}
          />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
