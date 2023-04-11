import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

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

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div className="Home">
      <h1>Hello!</h1>
      <br />
      {/* If we're logged in, show sign out, else send back to login */}
      {user ? <SignOut /> : navigate("/")}
    </div>
  );
};

// generates a Sign-Out button if user is signed in
function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

// // Generate the chat thread
// function UserData() {

//     // Get a reference to our user state
//     const [user] = useAuthState(auth);

//     // Get the collection associated with the user, if any
//     const userRef = collection(firestore, user.currentUser.uid);

//     // Get the last 25 messages ordered by creation time
//     const q = query(messagesRef, orderBy("createdAt"), limit(25));

//     // Use a webhook to get an array of messages from the db at runtime
//     const [messages] = useCollectionData(q, { idField: "id" });

//     const [formValue, setFormValue] = useState("");

//     // A reference to a dummy variable to scroll down into
//     const dummy = useRef();

//     // Nested method to send a message (add it to message collection)
//     const sendMessage = async (e) => {
//     // Prevents page from refreshing on form submit
//     e.preventDefault();

//     //grab the photoURL and UID of the current user
//     const { uid, photoURL } = auth.currentUser;

//     // Adds a document to the messages collection
//     await addDoc(messagesRef, {
//     text: formValue,
//     createdAt: serverTimestamp(),
//     uid,
//     photoURL,
//     });

//     // Clear the form once input is taken
//     setFormValue("");

//     // Scroll down to dummy (bottom) after new message
//     dummy.current.scrollIntoView({ behavior: "smooth" });
//     };
// }

export default Home;
