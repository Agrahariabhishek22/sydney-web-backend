const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const db=require('./config/db');
const eventRoutes=require('./routes/eventRoutes')
const app=express();

dotenv.config();
db.connect();

const allowedOrigins=['http://localhost:5173','https://sydney-web-frontend.vercel.app']

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use("/api/events",eventRoutes);
app.get('/',(req,res)=>{
    res.send("Api is running...");
});


const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
