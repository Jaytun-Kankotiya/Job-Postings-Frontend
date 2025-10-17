import { useState } from "react";
import Navbar from "../components/Navbar";
import { useJobContext } from "../contexts/JobContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostNewJob = () => {
  const { loading, setLoading, backendUrl } = useJobContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/v1/jobs", formData, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("New Job Posting Added Successfully");
        navigate("/job_postings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <form className="container" onSubmit={formSubmitHandler}>
        <h1 className="py-3">Post a Job</h1>

        <div>
          <label>Job Title:</label>
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
            className="form-control my-1"
          />
        </div>
        <br />

        <div>
          <label>Company Name:</label>
          <br />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={changeHandler}
            className="form-control my-1"
          />
        </div>
        <br />

        <div>
          <label>Location:</label>
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={changeHandler}
            className="form-control my-1"
          />
        </div>
        <br />

        <div>
          <label>Salary:</label>
          <br />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={changeHandler}
            className="form-control my-1"
          />
        </div>
        <br />

        <div>
          <label>Job Type:</label>
          <br />
          <select
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={changeHandler}
            className="form-control my-1">
                <option value="" defaultChecked>Select Job Type</option>
                <option value="Full-time (On-site)">Full-time (On-site)</option>
                <option value="Part-time (On-site)">Part-time (On-site)</option>
                <option value="Full-time (Remote)">Full-time (Remote)</option>
                <option value="Part-time (Remote)">Part-time (Remote)</option>
            </select>
        </div>
        <br />

        <div>
          <label>Job Description:</label>
          <br />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={changeHandler}
            className="form-control my-1"
          />
        </div>
        <br />

        <div>
          <label>Job Qualifications:</label>
          <br />
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={changeHandler}
            className="form-control my-1"
          />
        </div>
        <br />

        <button type="submit" className="btn btn-primary">
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </>
  );
};

export default PostNewJob;
