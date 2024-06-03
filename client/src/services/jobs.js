import axios from "axios";
import { BACKEND_URL } from "../constant";

export const getAllJobs= async ({skills})=>{
    try{
        const response= await axios.get(`${BACKEND_URL}/api/job/all?skills=${skills}`);
        return response;
    }
    catch(err){
        return err;
    }
}

export const getJobDetailsById= async (id)=>{
    try{
        const response= await axios.get(`${BACKEND_URL}/api/job/view/${id}`)
        return response;
    }
    catch(err){
        return err;
    }
}

export const createJob= async (jobData)=>{
    try{
        const response= await axios.post(`${BACKEND_URL}/api/job/create`, jobData, 
            {
                headers: {
                    "Content-Type":"application/json",
                    authorization: `${localStorage.getItem("token")}`,
                },
            }
        );
        return response;
    }
    catch(err){
        return err;
    }
}

export const updateJob= async (jobnumber,jobData)=>{
    try{
        const response= await axios.patch(`${BACKEND_URL}/api/job//update/${jobnumber}`, jobData,
        {
            headers: {
                "Content-Type":"application/json",
                authorization: `${localStorage.getItem("token")}`,
            },
        }
    );
    return response;
}
catch(err){
    return err;
}
}