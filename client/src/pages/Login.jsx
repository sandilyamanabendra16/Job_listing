import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import bgImg from "../assets/image 466.png";

export default function Login() {
    const [data, setData]= useState({
        email:"",
        password:"",
    })

    const navigate= useNavigate();

    const handleChange=(e)=>{
        setData({...data, [e.target.name]:e.target.value});
    }

    const handleLogin=(e)=>{
        e.preventDefault();
        login(data).then((response)=>{
            alert(`Welcome ${response.data.name}`);
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userId", response.data.userId)
            console.log(response.data);
            navigate('/jobs');
        });  
    }
    return ( 
    <div className={styles.full}>
        <div className={styles.left}>
        <h1> Already have an account? </h1>
        <p>Your personal job finder is here</p>
        <form onSubmit={handleLogin} className={styles.form}>
            <input type="email" placeholder="email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            <button type="submit"> Login</button>
            <p> Don't have an account <a href="/register">Sign Up</a></p>
        </form>
        </div>
        <div className={styles.right}>
            <h1>Your Personal Job Finder</h1>
            <img src={bgImg} alt="bgImg"/>
        </div>
    </div>);
}