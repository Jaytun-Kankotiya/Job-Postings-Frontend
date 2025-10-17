import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useJobContext } from "../contexts/JobContext";
import { useEffect, useState } from "react";
import axios from "axios";



const JobDetails = () => {

      const { backendUrl, loading, setLoading } = useJobContext();
      const [job, setJob] = useState(null)
      const {id} = useParams()


      useEffect(() => {
        const fetchJob = async () => {
            setLoading(true)
            try {
                const {data} = await axios.get(backendUrl + `/v1/jobs/${id}`)
                if(data.success){
                    setJob(data.data)
                }
            } catch (error) {
                console.log("Error Fetching Job: ", error)
            }finally {
                setLoading(false)
            }
        }
        fetchJob()
      }, [id, backendUrl])

      if(loading) return <p className="text-center fs-2 py-5">Loading...</p>
      if(!job) return <p className="text-center py-5">Job not found.</p>

      const qualification = job.qualifications.split('.,')

    return (
        <>
        <Navbar />
        <main className="container py-4">
            <h2 className="mb-3">{job.title}</h2>
            <div className="card h-100 shadow-sm">
                <div className="card-body my-1 mx-2 d-flex flex-column">
                <p><b>Company Name: </b>{job.companyName}</p>
                <p><b>Location: </b>{job.location}</p>
                <p><b>Salary: </b>${job.salary}</p>
                <p><b>Description: </b>{job.description}</p>
                <p className="mb-1"><b>Qualifications: </b></p>
                <ol>
                    {qualification.map((q, index) => (
                        <li key={index}>{q}</li>
                    ))}
                </ol>
                </div>
            </div>
        </main>
        </>
    )
}

export default JobDetails