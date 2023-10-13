import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { register } = useToken();
  const navigate = useNavigate();


  const handleRegistration = (e) => {
    e.preventDefault();


    if (!username || !password || !email || !firstName || !lastName || !role) {

      setShowModal(true);
      return;
    }


    const UserData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
      role: role,
    };

    register(UserData, `${process.env.REACT_APP_API_HOST}/api/users`);
    e.target.reset();
    navigate("/events");
  };

  return (
    <div>
      <div>
        <h2>Create Account</h2>
        <form onSubmit={(e) => handleRegistration(e)}>
          <div>
            <label>
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>
              Username
            </label>
            <input
              name="username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label>
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label>
              Email
            </label>
            <input
              name="email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label>
              Role
            </label>
            <input
              name="role"
              type="text"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
      {showModal && (
        <div>
          <div>
            <div>
              <div>
                <p>This field should not be null</p>
                <button
                  onClick={() => setShowModal(false)}
                >
                </button>
              </div>
              <p>Please fill out all required fields.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default SignupForm
