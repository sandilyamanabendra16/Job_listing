import axios from "axios";

export const getAllJobs= async ({skills})=>{
    try{
        const response= await axios.get(`http://localhost:4000/api/job/all?skills=${skills}`);
        return response;
    }
    catch(err){
        return err;
    }
}

export const getJobDetailsById= async (id)=>{
    try{
        const response= await axios.get(`http://localhost:4000/api/job/view/${id}`)
        return response;
    }
    catch(err){
        return err;
    }
}

export const createJob= async (jobData)=>{
    try{
        const response= await axios.post("http://localhost:4000/api/job/create", jobData, 
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
        const response= await axios.patch(`http://localhost:4000/api/job//update/${jobnumber}`, jobData,
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