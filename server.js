import "dotenv/config";
import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.json()); 

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

const db = new pg.Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
});

app.get("/profile",async (req,res)=>{
    try{
    const Userid = req.session.userId;
    if(!Userid){
        return res.status(401).json({error:`Not Authorized`});
    }
    const result = await db.query(
        `SELECT id,name,email
         FROM users
        WHERE id = $1`,[Userid]
    );
    return res.json(result.rows[0]);
}
catch(err){
        res.status(500).json({err:`Database Error`});
}

});

app.post("/register",async (req,res)=>{
    try{
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);
        const result = await db.query(
            `INSERT INTO users (name,email,password)
            VALUES ($1,$2,$3)
            RETURNING name,email`,[data.name,data.email,hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({err:`Database Error`});
    }
});

app.post("/login",async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password){
            return res.status(400).json({error:"Missing email or password"});
        }
        const user = await db.query(
            `SELECT id,password FROM users
            WHERE email = $1`,[email]
        );
        if(user.rowCount===0){
            return res.status(401).json({error:`Invalid Credentials`});
        }
        const userId = user.rows[0].id;
        const storedHash = user.rows[0].password;
        const validUser = await bcrypt.compare(password,storedHash);
        if(validUser){
            req.session.userId = userId;
            return res.status(200).json({message:"Login Successful"});
        }
         return res.status(401).json({message:"Login Unsuccessful"});
    }
    catch(err){
        res.status(500).json({err:`Database Error`});
    }
});

app.post("/logout",async (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({error:`Logout failed`})
        }
        return res.status(200).json({message:`Logout succesful`});
    });
});

app.listen(port,()=>{
    console.log(`Server is Running on PORT ${port}`);
});