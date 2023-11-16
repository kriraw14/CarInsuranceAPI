import express, { Express, Request, Response } from "express";
import carvalue from "./routes/carvalue";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", carvalue); // Car Value route

export default app;
