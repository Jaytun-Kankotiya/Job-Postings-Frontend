import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useJobContext } from "../contexts/JobContext.jsx";
import { data, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobPostings = () => {
  const { jobs, setJobs, fetchJobPostings, backendUrl, loading, setLoading } =
    useJobContext();
  const [search, setSearch] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteHandler = async (id) => {
    setDeleteLoading(true);
    try {
      const { data } = await axios.delete(backendUrl + `/v1/jobs/${id}`);
      if (data.success) {
        fetchJobPostings();
        toast.success("Job Posting Deleted Successfully");
      } else {
        toast.error("Error Deleting Job Posting");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  console.log(jobs);

  if (loading) return <p className="d-flex align-items-center justify-content-center text-center fs-2 py-5">Loading...</p>;
  if (!jobs) return <p className="text-center py-5">Job not found.</p>;

  const searchFilter = jobs.filter((job) => job.title.toLowerCase().includes(search.trim().toLowerCase()))
  return (
    <>
      <Navbar />
      <main className="container">
        <input
          type="text"
          placeholder="  Search by job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mt-3"
        />

        <h1 className="py-3 text-center text-secondary">All Job Postings</h1>
        <div className="row g-3">
          {searchFilter.map((job) => (
            <div className="col-md-4" key={job._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body my-1 mx-2 d-flex flex-column">
                  <h2>{job.title}</h2>
                  <p>
                    <b>Company name: </b>
                    {job.companyName}
                  </p>
                  <p>
                    <b>Location: </b>
                    {job.location}
                  </p>
                  <p>
                    <b>Job Type: </b>
                    {job.jobType}
                  </p>
                  <div className="mt-auto d-flex flex-column flex-sm-column flex-md-row gap-2">
                    <button className="btn btn-primary w-100 text-center">
                      <Link to={`/job_details/${job._id}`} className="nav-link">
                        See Details
                      </Link>
                    </button>
                    <button
                      onClick={() => deleteHandler(job._id)}
                      disabled={deleteLoading}
                      className="btn btn-danger w-100">
                      <Link className="nav-link">
                        {deleteLoading ? "Deleting..." : "Delete"}
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default JobPostings;
