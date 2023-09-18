import express from "express"; //Using es6 modules
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./Config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";

connectDB();
const app = express(); //Initialize express

// The below two line of code is body-parser middleware
app.use(express.json()); //this line allow us to parse raw json
app.use(express.urlencoded({ extended: true })); // this line will allow us to send form data

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready")); //route

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
