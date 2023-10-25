import { useEffect, useState } from "react";
import "./App.css";
import ListEvents from "./events/ListEvents.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import EventDetails from "./events/EventDetails";
import CreateEvent from "./admin/CreateEvent";
import ListUserEvents from "./user_events/ListUserEvents";
import ListMeals from "./meals/ListMeals";
import MealDetails from "./meals/MealDetails";
import CreateMeal from "./admin/CreateMeal";
import LoginForm from "./users/LoginForm";
import SignupForm from "./users/SignUpForm";
import MainPage from "./MainPage/MainPage";
import Navbar from "./Nav/Nav";
import AdminMeals from "./admin/AdminMeals";
import AdminEvents from "./admin/AdminEvents";
import Logout from "./users/Logout";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const { fetchWithToken, token } = useToken();
  const getAccountData = async () => {
    if (token) {
      const response = await fetchWithToken(
        `${process.env.REACT_APP_API_HOST}/api/userdata`
      );
      setUserRole(response["role"])
      setUserId(response["id"]);
    } else {
      setUserId(null);
      setUserRole(null);
    }
  };
  useEffect(() => {
    getAccountData();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <BrowserRouter basename={basename}>
        <Navbar userRole={userRole} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="events" element={<ListEvents />} />
          <Route path="events/:id" element={<EventDetails userId={userId} />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="meals" element={<ListMeals />} />
          <Route path="meals/:id" element={<MealDetails />} />
          <Route path="meals/create" element={<CreateMeal />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="admin/meals" element={<AdminMeals />} />
          <Route
            path="user/events"
            element={<ListUserEvents userId={userId} />}
          />
          <Route path="admin/events" element={<AdminEvents />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
