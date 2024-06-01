import { getAllJobs } from "../services/jobs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./Job.module.css";

export default function Job(){
    const [jobs, setJobs]= useState([]);
    const[skills,setSkills]=useState([]);

    useEffect(()=>{
        getAllJobs({skills: ""}).then((response)=>{
            setJobs(response.data)
        }).catch((err)=>{
            console.log(err);
            setJobs([]);
        })
    },[])
    console.log(jobs);

    const navigate = useNavigate();
    const jobpage=(id)=>{
        navigate(`/jobs/${id}`);
    }
    
    const login=()=>{
        
        navigate("/login");
    }
    const register=(e)=>{
       
        navigate("/register");
    }

    const triggerSearch=()=>{
        console.log({skills});
        getAllJobs({skills})
        .then((response)=>{setJobs(response.data)})
        .catch((err)=>{
            console.log(err);
            setJobs([])
        })
    }
    
    return(
        <div className={styles.mbody}>
            <header>
                <div>
                <h1> Jobfinder </h1>
                </div>
                
                <div >
                    {localStorage.getItem("token")? (
                       <button onClick={()=>navigate("/createjob")} className={styles.button5}> Create Job</button>
                    ):( <div className={styles.button}>
                        <button onClick={login}> Login</button>
                        <button onClick={register}> Register</button>
                        </div>
                    )}
                
                </div>
                
            </header>
            
            <div className={styles.searchbar}>
                <input type="text" placeholder="Type any job title" className={styles.button1}/>
                <div className={styles.button2}>
                    
                        <input type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Type skills separated by comma" className={styles.skillsinput}/> 
                   {/* <div> {skills? skills.split(",").map((skill,idx)=>(
                        <span key={idx}>{skill}</span>
                    )):null}</div> */}
                   <div className={styles.skillArray}> {skills && typeof skills === 'string' ? 
                        skills.split(",").map((skill, idx) => (
                        <span key={idx} className={styles.span1}>{skill}<button className={styles.spanBut}>X</button></span>
                            )) : null}
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={triggerSearch}> Apply Filters</button>
                        <button onClick={()=>setSkills([])}> Clear</button>
                    </div>
                </div>
            </div>
            <ul className={styles.job}>
                {jobs.map((job)=>(
                    <li className={styles.template} key={job._id}>
                        <div>
                        <h3> { job.title} </h3>
                        <div>
                        <div className={styles.salary}>
                        <p> ₹ {job.salary}</p>
                        <p> {job.location}</p> 
                        </div>
                        
                        </div>
                        <div className={styles.salary2} >
                            <p>{job.jobType}</p> <p>{job.locationType}</p>
                        </div>
                        </div>
                        <div className={styles.salary1}>
                            <div className={styles.skills}>
                            {job.skills.map((skill,idx)=>(
                                <span key={idx}>{skill}</span>
                            ))}
                            </div>
                        <div className={styles.salary2}>
                        <button onClick={()=>jobpage(job._id)}>
                            View Details
                        </button>
                        {localStorage.getItem("token")&&(
                            <button onClick={()=>navigate(`/edit/${job._id}`)}> Edit Job</button>
                        )}
                        </div>
                        </div>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
};