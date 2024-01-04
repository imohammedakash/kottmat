import express from "express";
import bodyParser from "body-parser";
import errorHandler from "./middleware/error.handle.js";
import cors from "cors";
import userRouter from './user/route/index.js'
import dotenv from 'dotenv'
// import path from 'path'
// import i18n from "i18n";
const app = express();

dotenv.config()
app.use(express.json({ limit: "55mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "55mb" }));

app.get('/', (req, res) => {
    res.send('********* Hi from Kottmat *********')
})

// Initialize i18n and use it as middleware in your Express application
// app.use(i18n.init);

// // Example i18n configuration
// i18n.configure({
//     locales: ['en', 'es'],
//     directory: path.join(__dirname, 'locales'),
//     defaultLocale: 'en',
//     objectNotation: true,
// });


app.use("/v1/user", userRouter);


const PORT = process.env.PORT || 5000

app.use((req, res, next) => {
    errorHandler(req, res, next);
});



const server = app.listen(PORT, () => {
    console.log(`Listing Port on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

export default app