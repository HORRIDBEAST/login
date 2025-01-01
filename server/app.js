const express=require('express');
const app=express();
const PORT=8954;
const connectDB=require('./database/db');
require('dotenv').config();
const cors=require('cors');
const userRouter=require('./routes/routes');
const createAdmin=require('./scripts/admin');
//middleware
app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter);
//connect to database
connectDB();
createAdmin();

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
