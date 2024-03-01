import express from 'express';
import errorMiddleware from '../../middleware/errorMiddleware.js';
import userRouter from './index.js';
import { createServer, proxy } from "aws-serverless-express";
import bodyParser from 'body-parser'; // Import body-parser middleware

// Create Express.js app
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON bodies
app.use("/user/v1", userRouter);
// Route for 404 Not Found
app.get('*', (req, res) => {
    res.status(404).send('Page Not Found 404');
});

// Error handling middleware
app.use((err, req, res, next) => {
    errorMiddleware(err, req, res, next);
});

// Create server
const server = createServer(app);
// Export Lambda handler function
export function handler(event, context){
    return proxy(server, event, context);
}
