import { useEffect, useState } from "react";
import "./App.css";
import ListEvents from "./events/ListEvents.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./users/LoginForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetails from "./events/EventDetails";

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
    <Route path="accounts/signup" element={<LoginForm />} />
    <Route path="events" element={<ListEvents/>} />
    <Route path="events/:id" element={<EventDetails/>}/>
  </Routes>
</BrowserRouter>

)
}

export default App;
