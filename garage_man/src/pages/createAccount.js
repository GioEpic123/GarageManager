import "../App.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
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

// CreateAccount:
// - Check to see if a user currenty has an account on our db
// - - If not, we prompt them to make one using their user ID as the document name
// - - If so, we just forward them to their specific homepage
const CreateAccount = () => {
  // -- // Set up our variables

  // Enable navigation
  const navigate = useNavigate();
  // Get reference to our collection of "users"
  const userRef = collection(firestore, "users");
  // Set our error state to false by default
  const [error, setError] = useState(false);
  // DocExists default to null
  const [docExists, setDocExists] = useState(null);
  // Tell user we're loading while we get set up
  const [loadState, setLoadState] = useState("loading");
  // Set our userID to null
  const [userID, setUserID] = useState(null);
  // Get current user ID
  const currentUser = auth.currentUser;

  // Make a placeholder to store our document reference later
  let userDocRef = null;

  // -- // useEffect calls - allows us to perform async operations when certain variables update (re-render)

  // - useEffect gets called whenever currentUser changes
  useEffect(() => {
    // If user isn't null, take note of it's ID and make a document reference
    if (currentUser != null) {
      setUserID(currentUser.uid);

      // This reference gets lost every render, but that's okay for our usage. Use the below comment to supress warnings
      // eslint-disable-next-line
      userDocRef = doc(userRef, currentUser.uid);
    }
  }, [currentUser]);

  // - useEffect gets called whenevr currentUser changes
  useEffect(() => {
    // Make async call to db if our reference is not null
    if (userDocRef != null) {
      getDoc(userDocRef)
        .then((docSnapshot) => {
          // Mark that we're done, take note of doc status
          setLoadState("done");
          setDocExists(docSnapshot.exists());
        })
        .catch((err) => {
          // Mark that an error occured, and take note
          setLoadState("error");
          setError(err);
        });
    } else {
      // Bad state - our user was null
      // have user go back to root and come back to ensure user is active
      console.log("Bad state-having user come back");
      navigate("/");
    }
    // React wants us to add navigate and userDocRef to dependancies, but this causes too many renders. Use below comment to suppress warnings
    // eslint-disable-next-line
  }, [currentUser]);

  // -- // Returns: What components we send to the user

  // If we've recieved an error, let the user know
  if (loadState === "error") {
    return (
      <div>
        <h1>Error:</h1>
        <h2>{error}</h2>
      </div>
    );
  }

  // Otherwise, do the following:
  // - Let user know that we're loading from the database
  // - once done, if we have a document for them, send them home
  // - otherwise, have them register and make a user document using carRegistration
  return (
    <div>
      <p>{userID}</p>
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

// Generates a form to register the user on our DB
function CarRegistrationForm(userID) {
  // Enable navigation and get a reference to our users collection
  const navigate = useNavigate();
  const userRef = collection(firestore, "users");

  //Reference our user state to take in form data
  const [makeVal, setMakeVal] = useState("");
  const [modelVal, setModelVal] = useState("");
  const [colorVal, setColorVal] = useState("");
  const [plateVal, setPlateVal] = useState("");

  // Nested method to publish user data on form complete
  const saveUserData = async (e) => {
    // Prevent the page from refreshing when the form is submitted
    e.preventDefault();

    // get the user's ID from our auth state
    // note: -- we don't guard in case it's null since the user needs time to enter their car info, so at this time it should be populated
    const uid = auth.currentUser.uid;
    // Create a doc on the "users" collection with our ID as the name
    await setDoc(doc(userRef, uid), {
      createdAt: serverTimestamp(),
      ID: uid,
      car: { make: makeVal, model: modelVal, color: colorVal, plate: plateVal },
    });

    // Once we're done adding the doc to the db, send them to the home page
    navigate("/home");
  };

  // -- Return the form to input user data
  return (
    <div className="Account">
      <form className="create-account-form" onSubmit={saveUserData}>
        <h1 className="ca-title" style={{ fontFamily: "Poppins" }}>
          Welcome!
        </h1>
        <h2>Please set up your account by putting a vehicle on file.</h2>
        <div>
          <label>Make: </label>
          <input
            value={makeVal}
            type="text"
            placeholder="Toyota"
            onChange={(e) => setMakeVal(e.target.value)}
          />
        </div>
        <div>
          <label>Model: </label>
          <input
            value={modelVal}
            type="text"
            placeholder="Camry"
            onChange={(e) => setModelVal(e.target.value)}
          />
        </div>
        <div>
          <label>Color: </label>
          <input
            value={colorVal}
            type="text"
            placeholder="Blue"
            onChange={(e) => setColorVal(e.target.value)}
          />
        </div>
        <div>
          <label>License Plate: </label>
          <input
            value={plateVal}
            type="text"
            placeholder="1ABC234"
            onChange={(e) => setPlateVal(e.target.value)}
          />
        </div>
        <div className="btns">
          {/* <button
            className="signup-btn"
            type="submit"
            onClick={() => navigate("/Home")}
          > */}
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
