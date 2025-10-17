import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);

const JobProvider = (props) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_API_URL;

  const fetchJobPostings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/v1/jobs");
      if (data.success) {
        setJobs(data.data);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message?.data?.message || error.message);
    } finally{
        setLoading(false)
    }
  };

  const value = {
    backendUrl,
    jobs, setJobs, fetchJobPostings,
    loading, setLoading
  };

  return (
    <>
      <JobContext.Provider value={value}>{props.children}</JobContext.Provider>;
    </>
  );
};

export { JobProvider };
