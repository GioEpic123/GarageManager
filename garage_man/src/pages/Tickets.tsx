import React, { useState, useEffect, useDebugValue } from "react";
import { app } from "./Login";
import { doc, updateDoc } from "firebase/firestore";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Help } from "@material-ui/icons";

//const auth = getAuth(app);
const firestore = getFirestore(app);

const Tickets = () => {
  const [loadState, setLoadState] = useState("loading");
  const [snapshot, setSnapshot] = useState({});
  const [error, setError] = useState("");
  //Creating a variable to track the update status and we want to store that in a hook somewhere
  const [updateStatus, setUpdateStatus] = useState("noUpdate");
  const [toUpdate, setToUpdate] = useState(0);

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
        console.log(querySnapshot);
      })
      .catch((err) => {
        setLoadState("Error");
        setError(err);
      });
  }, [toUpdate, updateStatus]);

  //creating useEffect for updating active status
  useEffect(() => {
    if (updateStatus === "update") {
      // Make your API Call here
      const update = async () => {
        //console.log(toUpdate);
        //looking for the doc reference according to the id we had set as toUpdate
        //needed to do a ref instead of the snapshot
        //issue; updating but does not rerender when it does update
        var reference = snapshot.docs.find((doc) => {
          return doc.id === toUpdate;
        }).ref;
        await updateDoc(reference, {
          active: false,
          price: 10,
        });

        setUpdateStatus("noUpdate");
      };
      update().catch(console.error);
    }
  }, [snapshot.docs, toUpdate, updateStatus]);

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
                  <th>Date Created</th>
                  <th>Reservation Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Payment</th>
                  <th>Cancel Ticket</th>
                </tr>

                {snapshot.docs.map((val, key) => {
                  if (val.data().active == true) {
                    var checkInTime = ""
                    var checkOutTime = ""
                    let dateMDY = new Date(
                      val.data().createdAt.seconds * 1000
                    ).toLocaleDateString("en-US");

                    if(new Date(val.data().startTime.seconds * 1000).getHours() < 12 || 
                      new Date(val.data().startTime.seconds * 1000).getHours() == 24){
                      checkInTime = `${new Date(
                        val.data().startTime.seconds * 1000
                      ).getHours()}:${String(
                        new Date(val.data().startTime.seconds * 1000).getMinutes()
                      ).padStart(2, "0")} AM`;
                    }
                    else{
                      if(new Date(val.data().startTime.seconds * 1000).getHours() == 12){
                        checkInTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours()}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                      else{
                        checkInTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours() - 12}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                    }
                    
                    if(new Date(val.data().startTime.seconds * 1000).getHours()+1 < 12 || 
                      new Date(val.data().startTime.seconds * 1000).getHours()+1 == 24){
                      if(new Date(val.data().startTime.seconds * 1000).getHours()+1 == 24){
                        checkOutTime = `${12}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} AM`;
                      }
                      else{
                        checkOutTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours() - 12 + 1}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} AM`;
                      }
                    }
                    else{
                      if(new Date(val.data().startTime.seconds * 1000).getHours()+1 == 24){
                        checkOutTime = `${12}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                      else{
                        checkOutTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours() - 12 + 1}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                    }

                    return (
                      <tr key={(key = val.ID)}>
                         <td>{dateMDY}</td>
                         <td>{String(val.data().date)}</td>
                         <td>{checkInTime}</td>
                         <td>{String(val.data().endTime)}</td>
                         <td>{String(val.data().price)}</td>


                        <td>
                          <button
                            onClick={() => {
                              
                                const confirmBox = window.confirm(
                                "Are you sure you want to cancel your ticket?"
                                );
                                //FIXME!!!!!!!!!!!!!!!!!
                                if (confirmBox === true) {
                                  setToUpdate(val.id);
                                  setUpdateStatus("update");

                                  var totalAmountRefund = 10 * (val.data().endTime - val.data().startTime);
                                  const confirmBox =window.confirm(
                                    'Total amount refunded:' + totalAmountRefund
                                  )
                                  if(confirmBox === true){
                                    console.log("helloooooo")
                                  }
                                }
                
                              
                              // if(confirmBox === true){
                              //   var totalAmountRefund = 10 * (val.data().endTime - val.data().startTime);
                              //   const confirmBox =window.confirm(
                              //     "Total amount refunded: " + totalAmountRefund
                              //   )
                              //   if(confirmBox === true){
                              //     console.log("helloooooo")
                              //   }
                              // }
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </table>

              <h1>Inactive Tickets</h1>
              <table className="inactiveTable">
                <tr>
                  <th>Date Created</th>
                  <th>Reservation Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Payment</th>
                </tr>
                {snapshot.docs.map((val, key) => {
                  if (val.data().active == false && val.data().isReservation == true) {
                    let dateMDY = new Date(val.data().createdAt.seconds * 1000).toLocaleDateString("en-US")
                      return (
                        <tr key={(key = val.ID)}>
                        <td>{dateMDY}</td>
                        <td>{String(val.data().date)}</td>
                        <td>{String(val.data().startTime)}</td>
                        <td>{String(val.data().endTime)}</td>
                        <td>{String(val.data().price)}</td>
                      </tr>
                    );
                  }else if(val.data().active == false && val.data().isReservation == false){
                    var checkInTime = ""
                    var checkOutTime = ""
                    let dateMDY = new Date(
                      val.data().createdAt.seconds * 1000
                    ).toLocaleDateString("en-US");

                    if(new Date(val.data().startTime.seconds * 1000).getHours() < 12 || 
                      new Date(val.data().startTime.seconds * 1000).getHours() == 24){
                      checkInTime = `${new Date(
                        val.data().startTime.seconds * 1000
                      ).getHours()}:${String(
                        new Date(val.data().startTime.seconds * 1000).getMinutes()
                      ).padStart(2, "0")} AM`;
                    }
                    else{
                      if(new Date(val.data().startTime.seconds * 1000).getHours() == 12){
                        checkInTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours()}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                      else{
                        checkInTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours() - 12}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                    }
                    if(new Date(val.data().startTime.seconds * 1000).getHours()+1 < 12 || 
                      new Date(val.data().startTime.seconds * 1000).getHours()+1 == 24){
                      if(new Date(val.data().startTime.seconds * 1000).getHours()+1 == 24){
                        checkOutTime = `${12}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} AM`;
                      }
                      else{
                        checkOutTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours() - 12 + 1}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} AM`;
                      }
                    }
                    else{
                      if(new Date(val.data().startTime.seconds * 1000).getHours()+1 == 24){
                        checkOutTime = `${12}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                      else{
                        checkOutTime = `${new Date(
                          val.data().startTime.seconds * 1000
                        ).getHours() - 12 + 1}:${String(
                          new Date(val.data().startTime.seconds * 1000).getMinutes()
                        ).padStart(2, "0")} PM`;
                      }
                    }
                      return (
                        <tr key={(key = val.ID)}>
                        <td>{dateMDY}</td>
                        <td>{String(val.data().date)}</td>
                        <td>{checkInTime}</td>
                        <td>{checkOutTime}</td>
                        <td>{String(val.data().price)}</td>
                      </tr>
                    );
                  }
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
function setData(arg0: any) {
  throw new Error("Function not implemented.");
}
