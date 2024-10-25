import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoute';
import authRoutes from './routes/authRoutes';

import { errorHandler } from './middleware/errorHandler';

const app = express();

const port = 3000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

app.get('/',(req : Request, res : Response) => {
    res.send("Hello");
});

app.listen(port, ()=>{
    console.log("Server running on port " + port);
});

