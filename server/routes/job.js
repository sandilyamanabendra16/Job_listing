const express = require("express");
const router = express.Router();
const { createJob, updateJob } = require("../controllers/job");
const { verifyAuth } = require("../middleware/verifyAuth");
const {getAllJobs}= require("../controllers/job")
const {getJobById}= require("../controllers/job")
router.get("/", (req, res) => {
  res.status(200).send("Job Route!");
});
router.post("/create", verifyAuth, createJob);
router.get("/all", getAllJobs );
router.get("/view/:id", getJobById);
router.patch("/update/:id", updateJob);
module.exports = router;