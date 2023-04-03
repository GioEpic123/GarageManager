import "../App.css";
import React from "react";
import {useNavigate} from "react-router-dom"
const CreateAccount = () =>{
    const navigate = useNavigate();
    return (
        <div className="Account">
            <h1 style={{fontFamily:"Poppins"}}>Create Account</h1>
            <form className="create-account-form">
                <div>
                    <label for="user-email">Email: </label>
                    <input
                    type="email"
                    class="user-email"
                    placeholder="example@email.com"/>
                </div>
                <div>
                    <label for="pass">Password: </label>
                    <input
                    type="password"
                    class="user-pass"/>
                </div>
                <div>
                    <label for="pass">Verify Password: </label>
                    <input
                    type="password"
                    class="verify-pass"/>
                </div>
                <div>
                    <label for="pass">License Plate: </label>
                    <input
                    type="text"
                    class="license-plate"/>
                </div>
            </form>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate('/Home')}>Sign Up</button>
        </div>
    );
}

export default CreateAccount;