import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { string } from 'zod';
import { connectDatabase, disconnectDatabase } from './utils/database';
import logger from './utils/logger';
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(helmet());


const server = app.listen(PORT, async ()=> {
    await connectDatabase();
    logger.info(`Server is running on ${PORT}`
    )}
)

const signals = ["SIGTERM", "SIGINT"];

function gracefullShutDown(signal : string){
    process.on(signal,async () => {
        logger.info("Goodbye, got signal", signal)
        server.close()
        await disconnectDatabase();
        //disconnect from db
        logger.info("Gracefull shutdown worked. My work is here done.")
        process.exit(0)
    })
}

for(let i = 0; i < signals.length; i++) {
    gracefullShutDown(signals[i])
}