import Register from "./pages/Registration";
import Login from "./pages/Login";
import Job from "./pages/Job";
import JobDetail from "./pages/JobDetail";
import CreateJob from "./pages/CreateJob";

import {BrowserRouter , Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login/>}/>
          <Route path="/" element={ <Login/>}/>
          <Route path="/register" element={ <Register/>}/>
          <Route path="/jobs" element={<Job/>}/>
          <Route path="/jobs/:id" element={<JobDetail/>} />
          <Route path="/createjob" element={ <CreateJob /> } />
          <Route path="/edit/:id" element={<CreateJob/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
