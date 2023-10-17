import React from "react";

function SignUpButton({ loggedIn }) {
  return (
    <div>
      {loggedIn ? (
        <button>Sign Up for Event</button>
      ) : (
        <p>Please log in to sign up for this event.</p>
      )}
    </div>
  );
}

export default SignUpButton;
