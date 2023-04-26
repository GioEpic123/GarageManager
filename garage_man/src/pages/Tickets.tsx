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

//constructor for ticket data type
export class TicketInfo {
  constructor(
    public date: Date = new Date,
    public checkIn: Date = new Date,
    public checkOut: Date = new Date,
    public active: boolean,
    public price: Number
  ) {  }

}
//create ticket type that has date(Date), startTime(time), duration(int), active(bool), and price(double)

//array that holds the tickets
const ticketData: TicketInfo[]=[];

  //placeholder tickets
  const ticket1 = new TicketInfo( new Date("2023-04-13T08:00:00"), new Date("2018-01-01T08:00:00"), new Date("2018-01-01T10:00:00"), false, 25.00)
  const ticket2 = new TicketInfo( new Date("2023-07-13T08:00:00"), new Date("2018-01-01T10:30:00"), new Date("2018-01-01T12:30:00"), true, 40.75)
  const ticket3 = new TicketInfo( new Date("2023-09-13T08:00:00"), new Date("2018-01-01T06:45:00"), new Date("2018-01-01T08:45:00"), false, 10.50)
  const ticket4 = new TicketInfo( new Date("2023-12-31T08:00:00"), new Date("2018-01-01T04:37:00"), new Date("2018-01-01T06:37:00"), true, 37.47)
  const ticket5 = new TicketInfo( new Date("2023-12-31T08:00:00"), new Date("2018-01-01T04:37:00"), new Date("2018-01-01T06:37:00"), false, 37.47)

  ticketData.push(ticket1)
  ticketData.push(ticket2)
  ticketData.push(ticket3)
  ticketData.push(ticket4)
  ticketData.push(ticket5)

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
          {ticketData.map((val, key) => {
          if(val.active == true){
          let dateMDY = `${val.date.getMonth() + 1}/${val.date.getDate()}/${val.date.getFullYear()}`;
          let checkInTime = `${val.checkIn.getHours()}:${String(val.checkIn.getMinutes()).padStart(2, '0')}`;
          let checkOutTime = `${val.checkOut.getHours()}:${String(val.checkOut.getMinutes()).padStart(2, '0')}`;
            return (
              <tr key={key}>
                <td>{dateMDY}</td>
                <td>{checkInTime}</td>
                <td>{checkOutTime}</td>
                <td>{String(val.price)}</td>
              </tr>
            )
          }})}
          </table>
        <h1>Inactive Tickets</h1>
          <table className="inactiveTable">
          <tr>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Payment</th>
          </tr>
          {ticketData.map((val, key) => {
          if(val.active == false){
          let dateMDY = `${val.date.getMonth() + 1}/${val.date.getDate()}/${val.date.getFullYear()}`;
          let checkInTime = `${val.checkIn.getHours()}:${String(val.checkIn.getMinutes()).padStart(2, '0')}`;
          let checkOutTime = `${val.checkOut.getHours()}:${String(val.checkOut.getMinutes()).padStart(2, '0')}`;
            return (
              <tr key={key}>
                <td>{dateMDY}</td>
                <td>{checkInTime}</td>
                <td>{checkOutTime}</td>
                <td>{String(val.price)}</td>
              </tr>
            )
          }})}
          </table>
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
