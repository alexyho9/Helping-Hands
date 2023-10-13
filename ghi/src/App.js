import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import ListEvents from "./events/ListEvents.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetails from "./events/EventDetails";
import LoginForm from "./users/LoginForm";
import SignupForm from "./users/SignUpForm";

function App() {
  const { token, fetchWithCookie } = useToken();
  const [user, setUser] = useState({});
   const fetchLoggedInUser = async () => {
     if (token) {
       const newToken = await fetchWithCookie(
         `${process.env.REACT_APP_API_HOST}/token`
       );

       const account = newToken.account;
       setUser(account);
     }
   };

   useEffect(() => {
     fetchLoggedInUser();
   }, [token]);
return(
<BrowserRouter>
  <Routes>
    <Route path="events" element={<ListEvents/>} />
    <Route path="events/:id" element={<EventDetails/>}/>
    <Route path="login" element={<LoginForm/>}/>
    <Route path="signup" element={<SignupForm/>}/>
  </Routes>
</BrowserRouter>

)
}

export default App;
