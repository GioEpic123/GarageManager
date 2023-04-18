import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

// App initialized with the following fields
//TO-DO: Find a way to make this in a single script so we don't re-reference elsewhere
const app = initializeApp({
  apiKey: "AIzaSyDSuLNYYqcUF8xpXHxI6Ijz8tILwshovZI",
  authDomain: "garageman-d75af.firebaseapp.com",
  projectId: "garageman-d75af",
  storageBucket: "garageman-d75af.appspot.com",
  messagingSenderId: "743378172343",
  appId: "1:743378172343:web:2b06e5c4dbb4ccae6f5032",
  measurementId: "G-KQZ7V1ZYJG",
});

const auth = getAuth(app);

const Settings = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div className="Settings">
      <view>
        <text>
        <h1>Settings</h1>
        {user ? <SignOut /> : <>{navigate("/")}</>}
        </text>
      </view>
    </div>
  );
};

// generates a Sign-Out button if user is signed in
function SignOut() {
  return (
    auth.currentUser && <Button
                 
    sx={{
      fontSize: "18px",
      color: "#000000",
      border: "2px solid black"
    }}
    variant="text"
    onClick={() => auth.signOut()}
    >
      <Link style={{fontFamily: "Poppins",textDecoration: "none", color: "black"}} to={'/'}>Sign Out</Link>
  </Button>
  );
}

export default Settings;
