import "../App.css";
import React, { useState } from "react";
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
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // Get the collection of users with the user, if any
  const userRef = collection(firestore, "users");

  // Use promises to make function synchronus
  // let getSnapPromise = new Promise(function (myResolve) {
  //   // Check to see if our user doc exists
  //   const docSnap = getDoc(userDocRef);
  //   var exists = false;
  //   if (docSnap.exists) {
  //     exists = true;
  //   }

  //   myResolve();
  // });

  // getSnapPromise.then(function (exists) {
  //   return CheckForCar(exists);
  // });

  // TO-DO: Fix this async part
  // const exists = await CheckForRecord(userRef, user.uid);
  const exists = CheckForRecord(userRef, user.uid);

  //Reference our user state to take in form data
  const [makeVal, modelVal, colorVal, plateVal] = useState("");

  // Nested method to publish user data on form complete
  const saveUserData = async (e) => {
    // Get the user's data
    const uid = user.uid;

    await addDoc(userRef, {
      createdAt: serverTimestamp(),
      uid,
      car: { make: makeVal, model: modelVal, color: colorVal, plate: plateVal },
    });
  };

  return (
    <div>
      {/* Check to see if we got a record yet */}
      {/* If so, take us home, else prompt user to input info */}
      {/* {userDoc ? navigate("/home") : ""} */}
      {exists ? <p>got a doc!</p> : ""}
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
          />
        </div>
        <div>
          <label for="pass">Model: </label>
          <input
            value={modelVal}
            type="model"
            class="car-model"
            placeholder="Camry"
          />
        </div>
        <div>
          <label for="pass">Color: </label>
          <input
            value={colorVal}
            type="color"
            class="car-color"
            placeholder="Blue"
          />
        </div>
        <div>
          <label for="pass">License Plate: </label>
          <input
            value={plateVal}
            type="text"
            class="license-plate"
            placeholder="1ABC234"
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
    </div>
  );
};

async function CheckForRecord(userRef, uid) {
  // Get a reference to where our user doc would be
  const userDocRef = doc(userRef, uid);

  //Check to see if our user doc exists
  const docSnap = await getDoc(userDocRef);
  var exists = false;
  if (docSnap.exists) {
    exists = true;
  }

  return exists;
}

export default CreateAccount;
