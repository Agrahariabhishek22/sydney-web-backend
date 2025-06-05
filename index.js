const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const db=require('./config/db');
const eventRoutes=require('./routes/eventRoutes')
const app=express();

dotenv.config();
db.connect();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.use("/api/events",eventRoutes);
app.get('/',(req,res)=>{
    res.send("Api is running...");
});


const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
