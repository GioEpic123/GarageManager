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

//constructor for ticket data type, probably not needed anymore
export class TicketInfo {
  constructor(
    public date: Date = new Date(),
    public checkIn: Date = new Date(),
    public checkOut: Date = new Date(),
    public active: boolean,
    public price: Number
  ) {}
}
//create ticket type that has date(Date), startTime(time), duration(int), active(bool), and price(double)

//array that holds the tickets, probably not needed anymore
const ticketData: TicketInfo[] = [];

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
          <h2>Error Loading tickets :</h2>
          <p>{error}</p>
        </view>
      </div>
    );
  }
  // Show a loading screen while we load, and show our tickets when we get them
  return (
    <div className="Tickets">
      <view>
        <section>
          {loadState === "loading" ? (
            <h2>Loading...</h2>
          ) : snapshot.docs.length === 0 ? (
            <p>No tickets to display. Make some!</p>
          ) : (
            <text>
              <h1>Tickets</h1>
              <h1>Active Tickets</h1>
              <table className="activeTable">
                <tr>
                  <th>Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Payment</th>
                </tr>
                {snapshot.docs.map((val, key) => {
                  //if (val.data().active == true) {
                  //let dateMDY = `${val.date.getMonth() + 1}/${val.date.getDate()}/${val.date.getFullYear()}`;
                  //let checkInTime = `${val.checkIn.getHours()}:${String(val.checkIn.getMinutes()).padStart(2, '0')}`;
                  //let checkOutTime = `${val.checkOut.getHours()}:${String(val.checkOut.getMinutes()).padStart(2, '0')}`;
                  return (
                    <tr key={(key = val.ID)}>
                      <td>{String(val.data().createdAt)}</td>
                      <td>{String(val.data().startTime)}</td>
                      <td>{String(val.data().endTime)}</td>
                      <td>{String(val.data().price)}</td>
                      <td><button>Delete</button></td>
                    </tr>
                  );
                  //}
                })}
              </table>
              <h1>Inactive Tickets</h1>
              <table className="inactiveTable">
                <tr>
                  <th>Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Payment</th>
                </tr>
                {snapshot.docs.map((val, key) => {
                  //if (val.data().active == false) {
                  //let dateMDY = `${val.date.getMonth() + 1}/${val.date.getDate()}/${val.date.getFullYear()}`;
                  //let checkInTime = `${val.checkIn.getHours()}:${String(val.checkIn.getMinutes()).padStart(2, '0')}`;
                  //let checkOutTime = `${val.checkOut.getHours()}:${String(val.checkOut.getMinutes()).padStart(2, '0')}`;
                  return (
                    <tr key={(key = val.ID)}>
                      <td>{String(val.data().createdAt)}</td>
                      <td>{String(val.data().startTime)}</td>
                      <td>{String(val.data().endtime)}</td>
                      <td>{String(val.data().price)}</td>
                      <td><button>Delete</button></td>
                    </tr>
                  );
                  //}
                })}
              </table>
            </text>
          )}
        </section>
      </view>
    </div>
  );
};

export default Tickets;
