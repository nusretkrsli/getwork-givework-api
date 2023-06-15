import express from 'express';
import "./config/database.js"
import userRoute from './controller/user-route.js'
import dashboardRoute from './controller/dashboard-route.js'
import contactRoute from './controller/contact-route.js'
import cors from 'cors'
import morgan from "morgan"
import errorHandler from './middleware/errorHandler.js';
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// API
app.use("/api/v1/users", userRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/contact", contactRoute);

app.use(errorHandler);
export default app;

const port = process.env.PORT || 3500;
app.listen(port,() =>{
    console.log(` app listening on port http://localhost:${port}/api/v1/`);
})