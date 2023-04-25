import React, { useState, useEffect } from "react";
import { app } from "./Login";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

//const auth = getAuth(app);
const firestore = getFirestore(app);

const Tickets = () => {
  const [loadState, setLoadState] = useState("loading");
  const [snapshot, setSnapshot] = useState({});
  const [error, setError] = useState("");

  // useEffect - gets called on page first render (since dependancies are empty)
  useEffect(() => {
    // Make query
    const q = query(
      collection(firestore, "tickets"),
      where("ID", "==", localStorage.getItem("id"))
    );
    // Async call to get results from our query
    getDocs(q)
      .then((querySnapshot) => {
        // Save our reslts and mark as finished
        setSnapshot(querySnapshot);
        setLoadState("done");
      })
      .catch((err) => {
        setLoadState("Error");
        setError(err);
      });
  }, []);

  // If we encounter an error, catch it here
  if (loadState === "Error") {
    return (
      <div className="Tickets">
        <view>
          <text>
            <h1>Tickets</h1>
          </text>
          <h2>Error Loading tickets :(</h2>
          <p>{error}</p>
        </view>
      </div>
    );
  }

  // Show a loading screen while we load, and show our tickets when we get them
  return (
    <div className="Tickets">
      <view>
        <text>
          <h1>Tickets</h1>
        </text>
        <section>
          {loadState === "loading" ? (
            <h2>Loading...</h2>
          ) : snapshot.docs.length === 0 ? (
            <p>No tickets to display. Make some!</p>
          ) : (
            <section>
              {snapshot.docs.map((doc) => {
                return (
                  <div key={doc.ID}>
                    <h2>
                      {doc.data().startTime} - Active: {doc.data().active}
                    </h2>
                    <p>{doc.data().duration} hrs at $10/hr</p>
                    <p>Subtotal: ${doc.data().price}</p>
                  </div>
                );
              })}
            </section>
          )}
        </section>
      </view>
    </div>
  );
};

export default Tickets;
