import "../App.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

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
const firestore = getFirestore(app);

// Check if the user has a vehicle by looking through the vehicles collection for
// a vehicle with their UID associated. If none exist, prompt them to add one
const CreateAccount = () => {
  // TO-DO: Fix this async part

  const navigate = useNavigate();
  //Check to see if our user doc exists

  // Error state default to false
  const [error, setError] = useState(false);
  // DocExists default to null
  const [docExists, setDocExists] = useState(null);
  const [loadState, setLoadState] = useState("loading");

  //const [userID, setUserID] = useState(null);

  // Get current user ID
  const uid = auth.currentUser.uid;
  // setUserID((prevState) => {
  //   if(prevState != null)
  //     return prevState;
  // });
  //setUserID(uid);

  // Get reference to collection of "users", if any
  const userRef = collection(firestore, "users");

  // Get a reference to where our user doc would be
  const userDocRef = doc(userRef, uid);

  // Effect loop:
  // - Make call to db to get the doc
  // - Update load state to done
  useEffect(() => {
    // Tell user we're loading
    setLoadState("loading");
    // Make async call to db
    getDoc(userDocRef)
      .then((docSnapshot) => {
        // Mark that we're done, take note of doc status
        setLoadState("done");
        setDocExists(docSnapshot.exists());
      })
      .catch((err) => {
        setLoadState("error");
        setError(err);
      });
  }, []);

  if (loadState === "error") {
    return (
      <div>
        <h1>Error:</h1>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div>
      <p>{uid}</p>
      {loadState === "loading" ? (
        <h1>Loading</h1>
      ) : docExists ? (
        navigate("/home")
      ) : (
        <CarRegistrationForm />
      )}
    </div>
  );
};

function CarRegistrationForm(uid, userRef) {
  const navigate = useNavigate();

  //Reference our user state to take in form data
  const [makeVal, setMakeVal] = useState("");
  const [modelVal, setModelVal] = useState("");
  const [colorVal, setColorVal] = useState("");
  const [plateVal, setPlateVal] = useState("");

  // Nested method to publish user data on form complete
  const saveUserData = async (e) => {
    // Get the user's data
    e.preventDefault();
    await addDoc(userRef, {
      createdAt: serverTimestamp(),
      uid,
      car: { make: makeVal, model: modelVal, color: colorVal, plate: plateVal },
    });
  };

  return (
    <form className="create-account-form" onSubmit={saveUserData}>
      <h1 className="ca-title" style={{ fontFamily: "Poppins" }}>
        Welcome!
      </h1>
      <h2>Please set up your account by putting a vehicle on file.</h2>
      <div>
        <label for="user-email">Make: </label>
        <input
          value={makeVal}
          type="make"
          class="car-make"
          placeholder="Toyota"
          onChange={(e) => setMakeVal(e.target.value)}
        />
      </div>
      <div>
        <label for="pass">Model: </label>
        <input
          value={modelVal}
          type="model"
          class="car-model"
          placeholder="Camry"
          onChange={(e) => setModelVal(e.target.value)}
        />
      </div>
      <div>
        <label for="pass">Color: </label>
        <input
          value={colorVal}
          type="car-color"
          class="car-color"
          placeholder="Blue"
          onChange={(e) => setColorVal(e.target.value)}
        />
      </div>
      <div>
        <label for="pass">License Plate: </label>
        <input
          value={plateVal}
          type="text"
          class="license-plate"
          placeholder="1ABC234"
          onChange={(e) => setPlateVal(e.target.value)}
        />
      </div>
      <div className="btns">
        <button
          className="signup-btn"
          type="submit"
          onClick={() => navigate("/Home")}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default CreateAccount;
