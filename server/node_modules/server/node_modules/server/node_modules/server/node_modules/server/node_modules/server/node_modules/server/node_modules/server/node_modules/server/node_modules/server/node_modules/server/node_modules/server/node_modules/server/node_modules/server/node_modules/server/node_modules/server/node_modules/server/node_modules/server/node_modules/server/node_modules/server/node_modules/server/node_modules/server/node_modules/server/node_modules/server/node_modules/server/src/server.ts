import express from "express";
import dontenv from 'dotenv'
import { connectDB } from "./config/db";
import router from "./routes/projectRoutes";
import { corsConfig } from "./config/cors";
import cors from 'cors'

dontenv.config()

connectDB()

const app = express()

app.use(cors(corsConfig) )

app.use(express.json())

//* Routes
app.use('/api/projects', router)

export default app