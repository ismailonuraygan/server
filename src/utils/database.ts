import mongoose, { mongo } from "mongoose";
import { processRequest } from "zod-express-middleware";
import logger from './logger';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/youtube-clone"

export async function connectDatabase() {
    try{
        await mongoose.connect(DB_CONNECTION_STRING)
        logger.info("Connected to the database")
    }catch(err){
        logger.error(err, "Failed to connected to database.")
        process.exit(1)
    }
}

export async function disconnectDatabase(){
    await mongoose.connection.close()
    logger.info("Disconnected from  database.")
}