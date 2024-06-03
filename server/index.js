const port=4000;
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const path=require('path');
const cors=require('cors');
const fs=require('fs');
const mongoose= require('mongoose');
const env=require('dotenv')
env.config();


const logStream=fs.createWriteStream(path.join(__dirname, 'log.txt'),{flags: 'a',});

const errorStream= fs.createWriteStream(path.join(__dirname, 'error.txt'),{flags:'a'});

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

app.use(
  cors({
    origin: "*",
  })
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    const now =new Date();
    const time= `${now.toLocaleTimeString()}`;
    const log=`${req.method} ${req.originalUrl} ${time}`;
    logStream.write(log+'\n');
    next();
})

app.use((err, req, res, next)=>{
    const now= new Date();
    const time=`${now.toLocaleTimeString()}`;
    const error=`${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error+ error.stack+'\n');
    res.status(500).send("Internal Server Error");
})

app.get("/", (req, res) => {
    res.send("Hello World!").status(200);
  });
  app.use("/api/auth", authRoutes);
  app.use("/api/job", jobRoutes);

app.use((req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + "\n");
    res.status(404).send("Route not found!");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
