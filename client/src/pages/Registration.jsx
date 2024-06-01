import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";
import bgImg from "../assets/image 466.png"

export default function Register() {

    const [data, setData]= useState({
        name: "",
        email: "",
        mobile: "",
        password: "",

    });

    const navigate= useNavigate();

    const handleChange= (e)=>{
        setData({...data ,[e.target.name]:e.target.value});
      
    };
    const registerUser= async (e)=>{
        e.preventDefault();
        console.log(data);
        const response= await register(data);
        alert(response.data)
        navigate("/login");
    }
    console.log(data);
    return ( 
    <div className={styles.full}>
        <div className={styles.left}> 
        <h1> Create an account</h1>
        <p>Your personal job finder is here</p>
        <form style={{
            display: 'flex',
            flexDirection: "column",
            gap: "1rem",
            margin: "auto",
        }}
            onSubmit={registerUser} 
        >
            <input type="text" name="name" onChange={handleChange} placeholder="Name"/>
            <input type="email" name="email" onChange={handleChange} placeholder="Email"/>
            <input type="tel" name="mobile" onChange={handleChange}  placeholder="Mobile"/>
            <input type="password" name="password" onChange={handleChange} placeholder="Password"/>
            <div className={styles.checkbox}>
                <input type="checkbox" id="checkbox" name="checkbox"/>
                <label htmlFor="checkbox"> By creating an account, I agree to our terms of use and privacy policy </label> 
            </div>
            <button type="submit" > Create Account</button>
            <p> Already have an account? <a href="/login">Sign in</a></p>
        </form>
        </div>
        <div className={styles.right}>
            <h1>Your Personal Job Finder</h1>
            <img src={bgImg} alt="bgImg"/>
        </div>
    </div>);
}