import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "./Login";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// App initialized with the following fields
//TO-DO: Find a way to make this in a single script so we don't re-reference elsewhere

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
          <h1>Hello, {localStorage.getItem("name")}!</h1>
          {user ? <TestSendTicket /> : <>{navigate("/")}</>}
        </text>
      </view>
    </div>
  );
};

function TestSendTicket() {
  const ticketRef = collection(firestore, "tickets");

  //Reference our user state to take in form data
  const [startTime, setStartTime] = useState("");
  const [active, setActive] = useState(true);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  var uid = localStorage.getItem("id");

  const [show, setShow] = useState(true);
  const [showReservation, setShowReservation] = useState(false);
  // Nested method to publish user data on form complete
  const saveTicketData = async (e) => {
    // Prevent the page from refreshing when the form is submitted
    e.preventDefault();
    // if (currentUser) {
    //   uid = currentUser.uid;
    // }
    var uid = "Undefined ID";
    if (currentUser) {
      uid = currentUser.uid;
      
    }
    // Create a doc on the "tickets" collection
    await addDoc(ticketRef, {
      createdAt: serverTimestamp(),
      startTime: serverTimestamp(),
      active: active,
      duration: duration,
      price: price,
      ID: uid,
    });

    // Once we're done adding, set all values to nothing
    setStartTime("");
    //setActive(false);
    setDuration("");
    setPrice("");
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    saveTicketData(e);
  };
  // -- Return the form to input user data
  return (
    <div className="Ticket">
      <button id="ticket-btn" onClick={() => setShow(!show)}>Create a Ticket</button>
      {show &&
      <div id="pricing-info">
        <form className="create-ticket">
         <p><strong>Price: <br/>$10/hr</strong></p>
          <div className="submit-btn">
            <button type="submit" onClick={handleConfirm}>Confirm</button>
          </div>
        </form>
      </div>
    }
    <br/>
    <button id="reservation-btn" onClick={() => setShowReservation(!showReservation)}>Create a Reservation</button>
    {showReservation &&
     <form className="create-reservation">
         <p><strong>Price: <br/>$10/hr + $5 flat fee</strong></p>
          <div className="submit-btn">
            <button type="submit">Confirm</button>
          </div>
        </form>
    }
      {/*<form className="send-ticket-form" onSubmit={saveTicketData}>
        <h2>Enter sample ticket information to send it to the DB.</h2>
        <p>UID: {uid}</p>
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
  </form>*/}
    </div>
  );
}
export default Home;
