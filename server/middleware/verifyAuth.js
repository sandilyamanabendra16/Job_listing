const jwt=require("jsonwebtoken");

const verifyAuth= (req, res, next)=>{
  try{
    const token= req.headers.authorization;
    if(!token){
      return res.status(401).send("Access Denied");
    }
    const decode= jwt.verify(token, "secret");

    req.userId=decode.userId;
    next();

  }
  catch(err){
    res.statua(400).send("Invalid token")
  }
}

module.exports={verifyAuth};