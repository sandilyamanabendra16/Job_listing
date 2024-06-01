import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./CreateJob.module.css";
import { createJob, getJobDetailsById, updateJob } from "../services/jobs";
import BgImg1 from "../assets/WallpaperDog-20567151 1.png";

export default function CreateJob(){
    const url = new URL(window.location.href);
    const isEdit= url.pathname.includes("edit");

    const navigate=useNavigate();

    const [data, setData]=useState({
        title: "",
      companyName: "",
      location: "",
      salary:"",
      description:"",
      locationType:"",
      jobType:"",
      skills:"",
    })
    const handleChange=(e)=>{
        setData((data)=>{
            return {...data, [e.target.name]:e.target.value};
        })
    }
    console.log(data);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(isEdit){
            const id=url.pathname.split('/')[2];
            const response= await updateJob(id,data);
            alert("Job updated successfully")
            if(response.status === 200){
                navigate("/jobs");
            }
        }  
        else {
        const response= await createJob(data);
        alert('Job created successfully')
        if(response.status === 201){
            navigate("/jobs");
        }}
    }

    

    useEffect(()=>{
        const token= localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }else{
            if(isEdit){
                const id=url.pathname.split("/")[2];
                const res= getJobDetailsById(id);
                res.then((response)=>{
                    const skills= response.data.skills.join(",");
                    setData({...response.data, skills});
                });
            }
        }
    },[])
    return(
        <div className={styles.full}>
            <div className={styles.left}>
            <h1>Add job Description</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                <label htmlFor="companyName"> Company Name</label>
                <input type="text" id="companyName" name="companyName" placeholder="Enter your company name here" onChange={handleChange} value={data.companyName}/>
                
                </div> 
                <div>
                <label htmlFor="title"> Job position</label>
                <input type="text"  id="title" name="title" placeholder="Enter job position" onChange={handleChange} value={data.title}/>
                </div>
                
                <div>
                <label htmlFor="salary">Monthly Salary</label>
                <input type="text" id="salary" name="salary" placeholder="Enter the amount in rupees" onChange={handleChange} value={data.salary}/>
                </div>

                <div>
                <label htmlFor="locationType"> Remote/office </label>
                <select name="locationType" id="locationType" onChange={handleChange} value={data.locationType}>
                    <option value={""}> Choose Location Type</option>
                    <option value="Remote"> Remote</option>
                    <option value="In-office"> In-office</option>
                </select>
                </div>

                <div>
                <label htmlFor="jobType"> Job Type</label>
                <select name="jobType" id="jobType" onChange={handleChange} value={data.jobType}>
                    <option value={""}> Choose Job Type</option>
                    <option value="Full time"> Full Time</option>
                    <option value="Part time"> Part Time</option>
                    <option value="Contract"> Contract</option>
                    <option value="Internship"> Internship</option>
                </select>
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" placeholder="Enter Location" onChange={handleChange} value={data.location}/>
                </div>

                <div>
                    <label htmlFor="description">Job Description</label>
                    <textarea type="text" id="description" name="description" placeholder="Type the job description" onChange={handleChange} value={data.description}/>
                </div>
                
                <div>
                    <label htmlFor="skills"> Skills Required</label>
                <input type="text" id="skills" name="skills" placeholder="Write skills separated by commas" onChange={handleChange} value={data.skills} className={styles.iskills}/>
                {data.skills.split(",").map((skill, idx)=>(
                    <span key={idx}> {skill} <button className={styles.spanBut}>X</button> </span>
                    
                ))}
                </div>
                {isEdit ? (
          <button type="submit">Update Job</button>
        ) : (
          <button type="submit">+ Add Job</button>)}
            </form>
            </div>
            <div className={styles.right}>
                <h1>Recruiter add job details here</h1>
                <img src={BgImg1}/> 
            </div>
        </div>
    )
}