import "../App.css";
import React, { useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
//import { Divider } from '@mui/material';

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// App initialized with the following fields
const app = initializeApp({
  apiKey: "AIzaSyDSuLNYYqcUF8xpXHxI6Ijz8tILwshovZI",
  authDomain: "garageman-d75af.firebaseapp.com",
  projectId: "garageman-d75af",
  storageBucket: "garageman-d75af.appspot.com",
  messagingSenderId: "743378172343",
  appId: "1:743378172343:web:2b06e5c4dbb4ccae6f5032",
  measurementId: "G-KQZ7V1ZYJG",
});

// Get a representation of our authentication system
const auth = getAuth(app);
// Firestore is our firestore database
const firestore = getFirestore(app);


// Main app to be created
function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <div className="Login">
        
        <form className="account-login">
        <h1 style={{fontFamily:"Poppins"}}>Login</h1>
            <label for="email">Email: </label>
                <input 
                type="email"
                id="email"
                placeholder="example@email.com">
                </input>
            <br/>
            <label for="pass">Password: </label>
                <input 
                type="password"
                id="pass"
                placeholder="password">
                </input>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
                <br/>
                <button className="create-account-btn" style={{fontFamily: "Poppins",background: "none", border: "none",color: "black"}} onClick={() => navigate('/CreateAccount')}>Create Account</button>
            </form>
           
            
        
      {/* Show Sign out button if user is logged in */}
      <section>{user ? <SignOut /> : ""}</section>
      {/* Show Chatroom if user is logged in, else show sign-in prompt */}
      <section>{user ? <ChatRoom /> : signInWithGoogle}</section>
    </div>
  );
}


// Sign-In page used to sign user in through Google Auth
/*function SignIn() {
    // Nested method to sign in using Google Auth
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    };
  
    //return <button onClick={signInWithGoogle}>Sign in with Google</button>;
  }*/

// generates a Sign-Out button if user is signed in
function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

// Generate the chat thread
function ChatRoom() {
  // Get a reference to the message collection
  const messagesRef = collection(firestore, "messages");
  // Get the last 25 messages ordered by creation time
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  // Use a webhook to get an array of messages from the db at runtime
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  // A reference to a dummy variable to scroll down into
  const dummy = useRef();

  // Nested method to send a message (add it to message collection)
  const sendMessage = async (e) => {
    // Prevents page from refreshing on form submit
    e.preventDefault();

    //grab the photoURL and UID of the current user
    const { uid, photoURL } = auth.currentUser;

    // Adds a document to the messages collection
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    // Clear the form once input is taken
    setFormValue("");

    // Scroll down to dummy (bottom) after new message
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {/* 'Dummy' ref to bottom, in order to scroll */}
        <div ref={dummy}></div>
      </main>
      {/* Form to submit the message to the DB */}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        {/* Submit button */}
        <button type="submit">Send</button>
      </form>
    </>
  );
}

//Makes a message with the information provided in props
function ChatMessage(props) {
  // Grabs the text and uid of the message
  const { text, uid, photoURL } = props.message;

  const shorterUid = String(uid).substring(0, 4);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";
  // Returns a simple text block with that data
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={"User " + shorterUid} />
      <p>{text}</p>
    </div>
  );
}

export default Login;