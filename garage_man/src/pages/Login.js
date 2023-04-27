import "../App.css";
import { useNavigate } from "react-router-dom";
//import { Divider } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// App initialized with the following fields
export const app = initializeApp({
  apiKey: "AIzaSyDSuLNYYqcUF8xpXHxI6Ijz8tILwshovZI",
  authDomain: "garageman-d75af.firebaseapp.com",
  projectId: "garageman-d75af",
  storageBucket: "garageman-d75af.appspot.com",
  messagingSenderId: "743378172343",
  appId: "1:743378172343:web:2b06e5c4dbb4ccae6f5032",
  measurementId: "G-KQZ7V1ZYJG",
});

// Get a representation of our authentication system
export const auth = getAuth(app);

// Main app to be created
function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="Login">
      <view>
        <text>
          <h1 id="title">GARAGE MAN</h1>
          {/* Show Sign out button if user is logged in */}
          <section>{user ? navigate("/CreateAccount") : <SignIn />}</section>
        </text>
      </view>
    </div>
  );
}
// Sign-In page used to sign user in through Google Auth
function SignIn() {
  // Nested method to sign in using Google Auth
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Button
      sx={{
        fontSize: "18px",
        color: "#000000",
        border: "2px solid black",
      }}
      variant="text"
      onClick={signInWithGoogle}
    >
      <Link
        style={{
          fontFamily: "Poppins",
          textDecoration: "none",
          color: "black",
        }}
      >
        Sign in with Google
      </Link>
    </Button>
  );
}

export default Login;
