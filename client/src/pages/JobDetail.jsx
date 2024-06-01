
import { useState, useEffect } from "react";
import { getJobDetailsById } from "../services/jobs";
import styles from "./JobDetail.module.css";
import { useNavigate } from "react-router-dom";

export default function JobDetail(){
    const [jobDetail, setJobDetail]=useState(null);
    const url= new URL(window.location.href);
    const id= url.pathname.split("/")[2];

    useEffect(()=>{
        getJobDetailsById(id).then((response)=>{
            if(response?.response?.status===500){
                return setJobDetail(null)
            }else if(response?.response?.status===404){
                return setJobDetail(null);
            }
            setJobDetail(response.data)
        }).catch((err)=>{
            console.log(err);
            setJobDetail(null);
        })
    },[])

    console.log(jobDetail);

    const navigate = useNavigate();
    const Login=()=>{
        
        navigate("/login");
    }
    const Register=(e)=>{
       
        navigate("/register");
    }
    return (
        <div> 
            <header>
                <div>
                <h1> Jobfinder </h1>
                </div>
                
                <div className={styles.button}>
                <button onClick={()=>Login()}> Login</button>
                <button onClick={()=>Register()}> Register</button>
                </div>
                
            </header>

        {jobDetail && (
            <div className={styles.mbody}>
                <div className={styles.template}>
                    <p> {jobDetail.title} {jobDetail.locationType} job at {jobDetail.companyName} </p>
                </div>
                <div className={styles.sbody}>
                <p>{jobDetail.jobType}</p>
                <h1>{jobDetail.title}</h1>
                <p>{jobDetail.location}</p>

                <p> Salary: {jobDetail.salary}/month</p>
                <h3> About the company:</h3>
                <p>  {jobDetail.companyName}</p>
                <h3> About the job/internship</h3>
                <p>{jobDetail.description}</p>
                
                
                <h3>Skill(s) required </h3>
            
                <ul className={styles.skill}>
                {jobDetail.skills.map((skill,idx)=>(
                    <li key={idx}> {skill} </li>
                ))}
                </ul>
                </div>
            </div>
        )}
        {jobDetail=== null && <p> Job not found</p>}
        </div>
    )
}

