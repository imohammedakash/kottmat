import app from './index.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import userRouter from './user/route/index.js'
import { createServer, proxy } from "aws-serverless-express"

app.use("/user/v1", userRouter);

app.get('*', (req, res) => {
    res.status(404).send('Page Not Fount 404');
})

app.use((err, req, res, next) => {
    errorMiddleware(err, req, res, next);
})


const server = createServer(app);


export function handler(event, context){
    return proxy(server, event, context)
}


