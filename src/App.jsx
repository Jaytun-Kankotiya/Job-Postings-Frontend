import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import JobPostings from "./pages/JobPostings";
import JobDetails from "./pages/JobDetails";
import PostNewJob from "./pages/PostNewJob";

function App() {
  return (
    <>
      <ToastContainer
        toastStyle={{ margin: "2.5rem" }}
        position="top-right"
        autoClose={4000}
        newestOnTop={false}
        hideProgressBar={false}
        draggable
        pauseOnHover
        closeOnClick
        theme="colored"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "8px",
        }}
      />
      <Routes>
        <Route path="/" element={<JobPostings />} />
        <Route path="/job_postings" element={<JobPostings />} />
        <Route path="/job_details/:id" element={<JobDetails />} />
        <Route path="/post_new_job" element={<PostNewJob />} />
      </Routes>
    </>
  );
}

export default App;
