import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./Login";

const auth = getAuth(app);
const firestore = getFirestore(app);

function CarUpdateForm(userID) {
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
        window.location.reload();
        };
    
    // -- Return the form to input user data
    return (
        <div>
        <form className="create-account-form" onSubmit={saveUserData}>
            <h2>Would you like to update your Vehicle Information?</h2>
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
            <button className="signup-btn" type="submit">
                Update Car
            </button>
            </div>
        </form>
        </div>
        );
    }
    

const Vehicles=()=>{
    const [loadState, setLoadState] = useState("loading");
    const [snapshot, setSnapshot] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        // Make query
        const q = query(
          collection(firestore, "users"),
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
      return(
        <div className="Vehicles">
      {loadState === "loading" ? (
        <h2>Loading...</h2>
      ) : snapshot.docs.length === 0 ? (
        <p>Nothing to show here</p>
      ) : (
        <section>
      {snapshot.docs.map((doc) => {
        return(
            <div key={doc.ID}>
                <view>
                    <text>
                    <h1>Vehicles</h1>
                    <h1>Current Vehicle Info:</h1>
                    <p>Color: {doc.data().car.color}</p>
                    <p>Make: {doc.data().car.make}</p>
                    <p>Model: {doc.data().car.model}</p>
                    <p>Plate: {doc.data().car.plate}</p>
                    <CarUpdateForm />
                    </text>
                </view>
                
            </div>
        )
        })}
</section>
)}
</div>
)}



export default Vehicles;