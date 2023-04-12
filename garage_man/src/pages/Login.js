import "../App.css";
import { useNavigate } from "react-router-dom";
//import { Divider } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// App initialized with the following fields
const app = initializeApp({
  apiKey: "AIzaSyDSuLNYYqcUF8xpXHxI6Ijz8tILwshovZI",
  authDomain: "garageman-d75af.firebaseapp.com",
  projectId: "garageman-d75af",
  storageBucket: "garageman-d75af.appspot.com",
  messagingSenderId: "743378172343",
  appId: "1:743378172343:web:2b06e5c4dbb4ccae6f5032",
  measurementId: "G-KQZ7V1ZYJG",
});

// Get a representation of our authentication system
const auth = getAuth(app);

// Main app to be created
function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="Login">
      <h1>Welcome! Sign in with Google to get started :)</h1>
      {/* Show Sign out button if user is logged in */}
      <section>{user ? navigate("/CreateAccount") : <SignIn />}</section>
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

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default Login;
