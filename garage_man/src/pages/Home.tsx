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
  setDoc,
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
const { currentUser } = auth;

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    // If we're logged in, show sign out, else send back to login
    <div className="Home">
      <view>
        <text>
          <h1>Hello!</h1>
          {user ? <TestSendTicket /> : <>{navigate("/")}</>}
        </text>
      </view>
    </div>
  );
};

function TestSendTicket() {
  const navigate = useNavigate();
  const ticketRef = collection(firestore, "tickets");

  //Reference our user state to take in form data
  const [startTime, setStartTime] = useState("");
  const [active, setActive] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  // Nested method to publish user data on form complete
  const saveTicketData = async (e) => {
    // Prevent the page from refreshing when the form is submitted
    e.preventDefault();

    var uid = "Undefined ID";
    if (currentUser) {
      uid = currentUser.uid;
    }
    // Create a doc on the "tickets" collection
    await addDoc(ticketRef, {
      createdAt: serverTimestamp(),
      startTime: startTime,
      active: active,
      duration: duration,
      price: price,
      ID: uid,
    });

    // Once we're done adding, set all values to nothing
    setStartTime("");
    setActive("");
    setDuration("");
    setPrice("");
  };

  // -- Return the form to input user data
  return (
    <div className="Ticket">
      <form className="send-ticket-form" onSubmit={saveTicketData}>
        <h2>Enter sample ticket information to send it to the DB.</h2>
        <div>
          <label>Start Time: </label>
          <input
            value={startTime}
            type="text"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>Active?: </label>
          <input
            value={active}
            type="text"
            onChange={(e) => setActive(e.target.value)}
          />
        </div>
        <div>
          <label>Duration: </label>
          <input
            value={duration}
            type="text"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            value={price}
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="btns">
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default Home;
